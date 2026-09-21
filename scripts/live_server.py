#!/usr/bin/env python3
"""
Live Static Server & Local Daemon for TTFS Cool Schools Ecosystem
"""

import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for offline PWA testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server(port=PORT):
    handler = CustomHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"\n============================================================")
        print(f"🌳 TTFS × UTRGV COOL SCHOOLS LIVE DAEMON ACTIVE")
        print(f"============================================================")
        print(f"Local Server:     http://localhost:{port}")
        print(f"Executive Hub v5: http://localhost:{port}/portals/v5/index.html")
        print(f"Tree Diary:       http://localhost:{port}/tree_diary.html")
        print(f"UTRGV Campus:     http://localhost:{port}/utrgv_campus.html")
        print(f"Time Machine:     http://localhost:{port}/time_machine.html")
        print(f"Month 3 Invoice:  http://localhost:{port}/invoices/Invoice_003_August_2026_TTFS_UTRGV.html")
        print(f"============================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped gracefully.")

if __name__ == "__main__":
    p = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(p)
