// import puppeteer
const puppeteer = require("puppeteer");

async function main() {
  // launch the browser
  const browser = await puppeteer.launch({ headless: true });

  //   create a page
  const page = await browser.newPage();

  //   go to your site
  await page.goto("http://www.tiktok.com/@taylorswift");

  const selector = '[data-e2e="user-post-item-list"]';
  await page.waitForSelector(selector);
  const videos = await page.$$eval(`${selector}>div`, (els) => {
    return els.map((el) => {
      const hrefs = el.querySelectorAll("a");
      const url = hrefs[0].href;
      const title = hrefs[1].title;
      return { url, title };
    });
  });
  console.log(videos);
  await browser.close();
}

main();
