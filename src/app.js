const express = require("express");
const { crawler } = require("./utils/crawler");
const app = express();

app.use(express.json());

let url, searchText;

app.get("/crawl", async (req, res) => {
  if (!url) return res.status(400).send("url이 입력되지 않았습니다.");
  if (!searchText)
    return res.status(400).send("searchText가 입력되지 않았습니다.");
  return res.status(200).json(await crawler(url, searchText));
});

app.post("/crawl", async (req, res) => {
  const { url: propsUrl, searchText: propsSearchText } = req.body;
  url = propsUrl;
  searchText = propsSearchText;
  return res.status(200).send("저장완료");
});

// 서버 시작
app.listen(8080, () => console.log("start"));
