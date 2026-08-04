import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1200, 'height': 800})
        
        await page.goto("http://localhost:8090/biodiversity.html")
        await page.wait_for_timeout(4000)
        
        await page.screenshot(path="/Users/dr3/.gemini/antigravity/brain/81bed525-3e1d-4c86-8784-7912052bb21a/biodiversity_check.png")
        await browser.close()

asyncio.run(main())
