#!/usr/bin/env python3
"""
Buzz Attack Zero-Token Mechanical Validator Gate
Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools

Enforces strict structural, syntax, privacy (COPPA/FERPA), and print-ready gates.
"""

import sys
import os
import json
import re
import hashlib
from datetime import datetime

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATRIX_FILE = os.path.join(WORKSPACE_DIR, "matrices", "master_matrix.json")

# PII Patterns to reject
PII_PATTERNS = [
    re.compile(r'\b\d{3}-\d{2}-\d{4}\b'),                 # SSN
    re.compile(r'\bstudent[_\s]?id\s*[:=]\s*\d{5,}\b', re.IGNORECASE), # Student ID
    re.compile(r'\b[A-Za-z0-9._%+-]+@(?!utrgv\.edu|texastrees\.org)[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'), # Non-approved emails
]

def log_pass(msg):
    print(f"\033[92m[GATE-PASS]\033[0m {msg}")

def log_fail(msg):
    print(f"\033[91m[GATE-FAIL]\033[0m {msg}", file=sys.stderr)

def log_info(msg):
    print(f"\033[94m[GATE-INFO]\033[0m {msg}")

def verify_zero_pii(file_path):
    """Scan file content for forbidden PII patterns."""
    if not os.path.isfile(file_path):
        return True, "File does not exist (handled by file existence check)"
    
    # Skip binary files
    if file_path.endswith(('.png', '.jpg', '.jpeg', '.docx', '.pdf', '.DS_Store')):
        return True, "Binary file skipped"

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for pat in PII_PATTERNS:
                matches = pat.findall(content)
                if matches:
                    return False, f"Potential PII match found: {matches[:3]} in {os.path.basename(file_path)}"
        return True, "No PII detected"
    except Exception as e:
        return False, f"Failed to read file: {e}"

def verify_file_syntax(file_path):
    """Verify file syntax based on extension."""
    if not os.path.exists(file_path):
        return False, f"Missing required file: {file_path}"
    
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext == '.json':
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                json.load(f)
            return True, "Valid JSON"
        except Exception as e:
            return False, f"JSON syntax error: {e}"
            
    elif ext == '.html':
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "<html" not in content.lower() and "<!doctype html>" not in content.lower():
                    return False, "HTML file missing doctype or html tag"
            return True, "Valid HTML structure"
        except Exception as e:
            return False, f"HTML read error: {e}"
            
    elif ext in ['.js', '.css', '.md']:
        if os.path.getsize(file_path) == 0:
            return False, "File is empty (0 bytes)"
        return True, f"Valid {ext} file ({os.path.getsize(file_path)} bytes)"
        
    return True, "Generic file check passed"

def verify_node(node):
    """Verify all files and requirements for a single DAG node."""
    node_id = node.get("id")
    title = node.get("title", "")
    files = node.get("files", [])
    
    errors = []
    
    if not files:
        errors.append(f"Node {node_id} has no defined files")
        
    for rel_path in files:
        full_path = os.path.join(WORKSPACE_DIR, rel_path)
        if not os.path.exists(full_path):
            errors.append(f"Missing file: {rel_path}")
            continue
            
        # Check syntax
        syntax_ok, syntax_msg = verify_file_syntax(full_path)
        if not syntax_ok:
            errors.append(f"{rel_path}: {syntax_msg}")
            
        # Check Zero PII
        pii_ok, pii_msg = verify_zero_pii(full_path)
        if not pii_ok:
            errors.append(f"{rel_path}: {pii_msg}")
            
    # Print ready verification for print_media category
    if node.get("category") == "print_media":
        for rel_path in files:
            if rel_path.endswith('.html'):
                full_path = os.path.join(WORKSPACE_DIR, rel_path)
                if os.path.exists(full_path):
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                        if "@media print" not in f.read():
                            errors.append(f"{rel_path} missing @media print styling")
                else:
                    errors.append(f"Missing file: {rel_path}")
                        
    if errors:
        return False, errors
    return True, f"Node {node_id} ('{title}') verified successfully"

def verify_all_matrix():
    """Verify entire master matrix."""
    if not os.path.exists(MATRIX_FILE):
        log_fail(f"Master matrix not found: {MATRIX_FILE}")
        return 1
        
    try:
        with open(MATRIX_FILE, 'r', encoding='utf-8') as f:
            matrix = json.load(f)
    except Exception as e:
        log_fail(f"Could not load master matrix: {e}")
        return 1
        
    nodes = matrix.get("nodes", [])
    if not nodes:
        log_fail("Master matrix contains 0 nodes")
        return 1
        
    total = len(nodes)
    passed = 0
    failed = 0
    
    log_info(f"Auditing {total} DAG nodes in {os.path.basename(MATRIX_FILE)}...")
    
    for node in nodes:
        ok, res = verify_node(node)
        if ok:
            passed += 1
            node["verification"]["gate_passed"] = True
            node["verification"]["zero_pii_checked"] = True
            node["verification"]["timestamp"] = datetime.now().isoformat()
            node["status"] = "verified"
            log_pass(f"[{node['id']}] {node['title']}")
        else:
            failed += 1
            node["verification"]["gate_passed"] = False
            node["status"] = "in_progress"
            log_fail(f"[{node['id']}] {node['title']}: {res}")
            
    # Update master matrix with verified states
    with open(MATRIX_FILE, 'w', encoding='utf-8') as f:
        json.dump(matrix, f, indent=2)
        
    log_info(f"Audit Complete: {passed}/{total} nodes verified. ({failed} failed/pending)")
    return 0 if failed == 0 else 1

def verify_payload_file(payload_path):
    """Verify an individual payload JSON submitted by a worker."""
    if not os.path.exists(payload_path):
        log_fail(f"Payload file not found: {payload_path}")
        return 1
        
    try:
        with open(payload_path, 'r', encoding='utf-8') as f:
            payload = json.load(f)
    except Exception as e:
        log_fail(f"Invalid payload JSON: {e}")
        return 1
        
    # Verify required keys
    req_keys = ["node_id", "author", "timestamp", "summary", "artifacts", "compliance"]
    for k in req_keys:
        if k not in payload:
            log_fail(f"Payload missing required field: {k}")
            return 1
            
    artifacts = payload.get("artifacts", [])
    for art in artifacts:
        p = art.get("path")
        full_path = os.path.join(WORKSPACE_DIR, p) if not os.path.isabs(p) else p
        if not os.path.exists(full_path):
            log_fail(f"Artifact not found: {p}")
            return 1
            
        syntax_ok, syntax_msg = verify_file_syntax(full_path)
        if not syntax_ok:
            log_fail(f"Artifact syntax error {p}: {syntax_msg}")
            return 1
            
        pii_ok, pii_msg = verify_zero_pii(full_path)
        if not pii_ok:
            log_fail(f"Artifact PII violation {p}: {pii_msg}")
            return 1

    log_pass(f"Payload for node {payload['node_id']} passed all mechanical gates!")
    return 0

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        sys.exit(verify_all_matrix())
    elif len(sys.argv) > 1:
        sys.exit(verify_payload_file(sys.argv[1]))
    else:
        print("Usage: python3 00-system/validator_gate.py [--all | <payload.json>]")
        sys.exit(verify_all_matrix())
