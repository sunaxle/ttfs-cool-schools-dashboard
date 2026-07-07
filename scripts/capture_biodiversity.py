from playwright.sync_api import sync_playwright
import time

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        
        file_url = "file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/biodiversity.html"
        print(f"Navigating to {file_url}")
        page.goto(file_url, wait_until="networkidle")
        
        # Wait for ArcGIS and map to fully load
        print("Waiting for ArcGIS map to render...")
        page.wait_for_timeout(8000)
        
        print("Capturing full page...")
        page.screenshot(path="/Users/dr3/Desktop/biodiversity_full.png", full_page=True)
        browser.close()
        print("Screenshot captured successfully.")

if __name__ == "__main__":
    capture()
