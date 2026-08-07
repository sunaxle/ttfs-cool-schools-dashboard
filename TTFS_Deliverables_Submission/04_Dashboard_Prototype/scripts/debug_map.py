import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Listen for console events
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))
        
        await page.goto("http://localhost:8090/temperature.html")
        await page.wait_for_timeout(3000)
        
        # Slide the slider
        await page.evaluate('document.getElementById("timeSlider").value = 14')
        await page.evaluate('document.getElementById("timeSlider").dispatchEvent(new Event("input"))')
        
        await page.wait_for_timeout(1000)
        await page.screenshot(path="/Users/dr3/.gemini/antigravity/brain/81bed525-3e1d-4c86-8784-7912052bb21a/debug_screenshot.png")
        await browser.close()

asyncio.run(main())
