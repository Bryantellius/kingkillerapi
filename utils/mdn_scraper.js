const cheerio = require("cheerio");
const axios = require("axios").default;
const Definition = require("./Definition");
const { writeFile } = require("fs");
const { join } = require("path");

let baseURL = "https://developer.mozilla.org";
let endpoint = "/en-US/docs/Glossary";
let dataName = "terms"; // rename per data pull

let datalist = [];
let expectedLength = 0;

async function pullData() {
  try {
    let { data } = await axios.get(baseURL + endpoint);
    let $ = cheerio.load(data);
    let datalistHTML = $(".sidebar-inner a");
    expectedLength = datalistHTML.length;
    for (let ele of datalistHTML) {
      pullSingleData(baseURL + $(ele).attr("href"), $(ele).text());
    }
  } catch (e) {
    console.error(e);
  }
}

async function pullSingleData(url, title) {
  let { data } = await axios.get(url);
  let $ = cheerio.load(data);

  console.log(
    `Reading ${title} data. ${datalist.length} of ${expectedLength}...`
  );

  let defObj = new Definition(
    title,
    $(".main-page-content > div > p").text(),
    url
  );

  datalist.push(defObj);

  if (datalist.length == expectedLength)
    writeFile(
      join(__dirname, `../assets/${dataName}.json`),
      JSON.stringify(datalist),
      (err) => {
        if (err) return console.error(err);

        console.log(`Overwrote ${dataName}.json file ✅`);
      }
    );
}

pullData();
