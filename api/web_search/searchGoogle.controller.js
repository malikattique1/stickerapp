const puppeteer = require('puppeteer');
const searchGoogle = async (searchQuery) => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        ignoreHTTPSErrors: true,
        headless: false,
        devtools: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    var page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https:www.duckduckgo.com/');
    await page.type('input[name="q"]', searchQuery);
    await page.$eval('input[id=search_button_homepage]', button => button.click());
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.$eval('a.js-zci-link--images', a => a.click());
    // await page.waitForNavigation({waitUntil: 'load'});
    await page.waitForTimeout(3000);
    // await page.waitFor(2000);
    await page.screenshot({path: 'example.png'});

    await page.evaluate(scrollToBottom);
    async function scrollToBottom() {
      let finishTime = new Date().getTime() + (0 * 60 * 1000);
      await new Promise(resolve => {
        const distance = 100; 
        const delay = 100;
        const timer = setInterval(() => {
          document.scrollingElement.scrollBy(0, distance);
          if (new Date().getTime() > finishTime) {
            clearInterval(timer);
            resolve();
          }
        }, delay);
      });
    }



    var pagef = page.url()
    const searchResults = await page.$$eval('div.has-detail', (results,pagef)=>{
        var data = [];
        var url = pagef;
        results.forEach((parent_Iteminresults_asaparameter)=> {
            const insideparent = parent_Iteminresults_asaparameter.querySelectorAll('div.tile--img__media > span.tile--img__media__i > img');
            if (insideparent.length == 0) {
                return data;
            }
            link = insideparent[0].src;
            data.push({link});
            
        },url);
        return data;
    },pagef);
    
    await browser.close();
    // console.log(searchResults);
    return searchResults;
};
module.exports = searchGoogle;
