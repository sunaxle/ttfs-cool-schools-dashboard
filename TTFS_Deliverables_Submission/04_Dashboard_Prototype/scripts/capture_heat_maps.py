from playwright.sync_api import sync_playwright
import time
import os

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})
        
        # Open local HTML file
        file_url = "file:///Users/dr3/Documents/Antigravity%20Designs/work/TTFS_UTRGV_Project_Cool_Schools/temperature.html"
        print(f"Navigating to {file_url}")
        page.goto(file_url, wait_until="networkidle")
        
        # Wait for ArcGIS and map to fully load
        print("Waiting for ArcGIS map to render...")
        page.wait_for_timeout(8000) # Extra buffer for ArcGIS 
        
        # Morning (8 AM)
        print("Capturing 8 AM...")
        page.evaluate('document.getElementById("timeSlider").value = 8; document.getElementById("timeSlider").dispatchEvent(new Event("input"));')
        page.wait_for_timeout(1000)
        page.screenshot(path="docs/heatmap_morning.png")

        # Midday (12 PM)
        print("Capturing 12 PM...")
        page.evaluate('document.getElementById("timeSlider").value = 12; document.getElementById("timeSlider").dispatchEvent(new Event("input"));')
        page.wait_for_timeout(1000)
        page.screenshot(path="docs/heatmap_midday.png")

        # After School (4 PM)
        print("Capturing 4 PM...")
        page.evaluate('document.getElementById("timeSlider").value = 16; document.getElementById("timeSlider").dispatchEvent(new Event("input"));')
        page.wait_for_timeout(1000)
        page.screenshot(path="docs/heatmap_evening.png")

        browser.close()
        print("Screenshots captured successfully.")

if __name__ == "__main__":
    capture()
