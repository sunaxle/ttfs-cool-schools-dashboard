#!/usr/bin/env python3
"""
Buzz Attack Swarm Dispatcher & Batch Runner
Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools
"""

import sys
import os
import json
import subprocess
from datetime import datetime

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATRIX_FILE = os.path.join(WORKSPACE_DIR, "matrices", "master_matrix.json")
GATE_SCRIPT = os.path.join(WORKSPACE_DIR, "00-system", "validator_gate.py")

def load_matrix():
    with open(MATRIX_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_matrix(matrix):
    with open(MATRIX_FILE, 'w', encoding='utf-8') as f:
        json.dump(matrix, f, indent=2)

def print_status():
    matrix = load_matrix()
    nodes = matrix.get("nodes", [])
    print(f"\n=================================================================")
    print(f"🐝 BUZZ ATTACK SWARM STATUS: {matrix.get('project')}")
    print(f"=================================================================")
    print(f"Contract Total:    ${matrix.get('contract_total', 0):,.2f}")
    print(f"Cumulative Billed: ${matrix.get('cumulative_billed', 0):,.2f} (53.3% Milestone Progress)")
    print(f"Total Nodes:       {len(nodes)}")
    
    status_counts = {}
    for n in nodes:
        s = n.get("status", "unknown")
        status_counts[s] = status_counts.get(s, 0) + 1
        
    for s, c in status_counts.items():
        print(f" - {s.upper():<12}: {c} nodes")
    print(f"-----------------------------------------------------------------")
    for n in nodes:
        st = n.get("status")
        icon = "✅" if st == "verified" else "⏳" if st == "in_progress" else "⚪"
        print(f"{icon} [{n['id']:<10}] {n['title']:<48} ({n.get('category')})")
    print(f"=================================================================\n")

def get_batches(batch_size=5):
    matrix = load_matrix()
    nodes = matrix.get("nodes", [])
    unverified = [n for n in nodes if n.get("status") != "verified"]
    
    batches = []
    for i in range(0, len(unverified), batch_size):
        batches.append(unverified[i:i+batch_size])
    return batches

def run_mechanical_gate():
    res = subprocess.run([sys.executable, GATE_SCRIPT, "--all"], capture_output=False)
    return res.returncode

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--status":
        print_status()
    elif len(sys.argv) > 1 and sys.argv[1] == "--batches":
        batches = get_batches()
        print(f"Found {len(batches)} batches remaining:")
        for idx, b in enumerate(batches, 1):
            print(f"\nBatch {idx} ({len(b)} nodes):")
            for node in b:
                print(f"  - [{node['id']}] {node['title']}")
    elif len(sys.argv) > 1 and sys.argv[1] in ["--verify-all", "--all"]:
        sys.exit(run_mechanical_gate())
    else:
        print_status()
        print("Dispatching mechanical gate audit...")
        sys.exit(run_mechanical_gate())
