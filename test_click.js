const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto('file:///Users/dr3/Documents/Antigravity Designs/work/agroecology/agriculture_physics_tree.html');
    await page.waitForTimeout(1000);
    const logs = [];
    page.on('console', msg => logs.push(msg.text()));
    page.on('pageerror', err => logs.push(err.toString()));
    
    // Evaluate a click on a yellow leaf node
    await page.evaluate(() => {
        const leaves = document.querySelectorAll('circle[fill="#fde047"]');
        if (leaves.length > 0) {
            console.log("Found " + leaves.length + " clickable leaves. Clicking first one.");
            // Click its parent <g> since the event is bound to the g.node
            const el = leaves[0].parentElement;
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            el.dispatchEvent(event);
        } else {
            console.log("No clickable leaves found!");
        }
    });
    
    await page.waitForTimeout(500);
    console.log("Logs:");
    console.log(logs.join("\n"));
    
    await browser.close();
})();
