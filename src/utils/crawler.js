const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function crawler(url, searchText) {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.content();
  const $ = cheerio.load(content);

  const selectedElement = $(`:contains("${searchText}"):last`);
  if (selectedElement.length) {
    const element = selectedElement
      .parents()
      .map((_, el) => ({ className: el.attribs.class, tagName: el.tagName }))
      .get()
      .reverse()
      .concat({
        className: selectedElement[0].attribs.class,
        tagName: selectedElement[0].tagName,
      });

    const content = selectedElement.parent().text();
    return { element, content };
  }
  return `텍스트 "${searchText}"을(를) 포함하는 엘리먼트를 찾을 수 없습니다.`;
}

module.exports = { crawler };
