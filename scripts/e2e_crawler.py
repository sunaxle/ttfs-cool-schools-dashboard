#!/usr/bin/env python3
"""
Automated End-to-End Link & Integrity Crawler
Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools

Audits every HTML file in the repository, verifies 100% of internal links, scripts,
stylesheets, and image assets, tests PII compliance, and outputs an auditable certification report.
"""

import os
import sys
import re
import json
from html.parser import HTMLParser
from datetime import datetime

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORT_FILE = os.path.join(WORKSPACE_DIR, "docs", "QA_CERTIFICATION.json")

class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.scripts = []
        self.stylesheets = []
        self.images = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'a' and 'href' in attr_dict:
            self.links.append(attr_dict['href'])
        elif tag == 'script' and 'src' in attr_dict:
            self.scripts.append(attr_dict['src'])
        elif tag == 'link' and attr_dict.get('rel') == 'stylesheet' and 'href' in attr_dict:
            self.stylesheets.append(attr_dict['href'])
        elif tag == 'img' and 'src' in attr_dict:
            self.images.append(attr_dict['src'])

def is_external(url):
    return url.startswith(('http://', 'https://', 'mailto:', 'tel:', '//', '#', 'javascript:'))

def resolve_path(source_file, target_url):
    # Strip query params and hash anchors
    clean_url = target_url.split('?')[0].split('#')[0]
    if not clean_url:
        return None
    source_dir = os.path.dirname(source_file)
    if clean_url.startswith('/'):
        # Relative to workspace root
        return os.path.join(WORKSPACE_DIR, clean_url.lstrip('/'))
    else:
        # Relative to current file
        return os.path.normpath(os.path.join(source_dir, clean_url))

def crawl_workspace():
    print(f"\n=================================================================")
    print(f"🕷️ RUNNING E2E ASSET & LINK INTEGRITY CRAWLER")
    print(f"Workspace: {WORKSPACE_DIR}")
    print(f"=================================================================\n")

    html_files = []
    for root, dirs, files in os.walk(WORKSPACE_DIR):
        # Exclude non-web and archive directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '.gemini', 'Tree_Research_Papers', 'TTFS_Raw_Logs_and_Media', 'TTFS_Deliverables_Submission']]
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))

    print(f"Found {len(html_files)} HTML pages to crawl...", flush=True)

    total_links = 0
    broken_links = []
    verified_files = 0
    pii_violations = []

    pii_pattern = re.compile(r'\b\d{3}-\d{2}-\d{4}\b')

    for html_path in sorted(html_files):
        rel_html = os.path.relpath(html_path, WORKSPACE_DIR)
        with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Check PII
        if pii_pattern.search(content):
            pii_violations.append(rel_html)

        parser = LinkExtractor()
        try:
            parser.feed(content)
        except Exception as e:
            print(f"⚠️ Warning parsing {rel_html}: {e}")
            continue

        all_refs = [
            ('link', u) for u in parser.links
        ] + [
            ('script', u) for u in parser.scripts
        ] + [
            ('stylesheet', u) for u in parser.stylesheets
        ] + [
            ('image', u) for u in parser.images
        ]

        file_has_error = False
        for ref_type, url in all_refs:
            if is_external(url):
                continue
            total_links += 1
            target_path = resolve_path(html_path, url)
            if not target_path or not os.path.exists(target_path):
                broken_links.append({
                    'source_page': rel_html,
                    'type': ref_type,
                    'broken_target': url,
                    'resolved_path': os.path.relpath(target_path, WORKSPACE_DIR) if target_path else 'None'
                })
                file_has_error = True

        if not file_has_error:
            verified_files += 1

    # Report Output
    report = {
        'project': 'Texas Trees Foundation (TTFS) × UTRGV Project Cool Schools',
        'timestamp': datetime.now().isoformat(),
        'pages_crawled': len(html_files),
        'total_internal_references': total_links,
        'verified_clean_pages': verified_files,
        'broken_link_count': len(broken_links),
        'pii_violation_count': len(pii_violations),
        'integrity_score_pct': round((1 - len(broken_links) / max(1, total_links)) * 100, 2),
        'broken_links': broken_links,
        'pii_violations': pii_violations
    }

    os.makedirs(os.path.dirname(REPORT_FILE), exist_ok=True)
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print(f"-----------------------------------------------------------------")
    print(f"Pages Crawled:        {len(html_files)}")
    print(f"Internal References:  {total_links}")
    print(f"Clean Pages:          {verified_files} / {len(html_files)}")
    print(f"Broken Links Found:   {len(broken_links)}")
    print(f"PII Violations:       {len(pii_violations)}")
    print(f"Integrity Score:      {report['integrity_score_pct']}%")
    print(f"Report Written:       {os.path.relpath(REPORT_FILE, WORKSPACE_DIR)}")
    print(f"=================================================================\n")

    if broken_links:
        print("❌ Broken Link Details:")
        for b in broken_links[:10]:
            print(f"  - [{b['source_page']}] ({b['type']}) -> {b['broken_target']}")
        return 1

    print("✅ 100% E2E Asset & Link Integrity Verified!")
    return 0

if __name__ == '__main__':
    sys.exit(crawl_workspace())
