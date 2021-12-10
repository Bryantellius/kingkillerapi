const cheerio = require("cheerio");
const axios = require("axios").default;
const { writeFile } = require("fs");
const { join } = require("path");

let baseURL = "https://kingkiller.fandom.com";
let dataName = "characters"; // rename per data pull

let datalist = [];
let expectedLength = 0;

async function pullData() {
  try {
    let { data } = await axios.get(
      `https://kingkiller.fandom.com/wiki/Category:${
        dataName[0].toUpperCase() + dataName.slice(1)
      }`
    );
    let $ = cheerio.load(data);
    let datalistHTML = $("li.category-page__member > a");
    expectedLength = datalistHTML.length;
    for (let ele of datalistHTML) {
      if (
        !$(ele).text().includes("Category") &&
        !$(ele).text().includes("File")
      ) {
        pullSingleData(baseURL + ele.attribs.href, $(ele).text());
      } else {
        expectedLength--;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function pullSingleData(url, title) {
  let { data } = await axios.get(url);
  let char = {};
  let $ = cheerio.load(data);

  if (!$("aside")[0]) {
    char.name = title;
    char.details = "No details";
  } else {
    for (let ele of $("aside")[0].children) {
      if ($(ele).attr("data-source") == "name") {
        char[$(ele).attr("data-source")] = $(ele).text();
      } else if (ele.name == "section") {
        let details = {};
        let extracted = [];

        let divs = ele.children.filter((ele) => ele.name == "div");
        let lis = [];

        for (let div of divs) {
          for (let prop of div.children) {
            if ($(prop).text().replace(/\n|\t/g, "")) {
              if (prop.children[0].name == "ul") {
                for (let li of prop.children[0].children) {
                  lis.push($(li.children[0]).text().replace(/\n|\t/g, ""));
                }
              } else {
                if (lis.length > 0) {
                  extracted.push(lis);
                  lis = [];
                }
                extracted.push($(prop).text().replace(/\n|\t/g, ""));
              }
            }
          }
        }

        for (let i = 0; i < extracted.length; i++) {
          if (i % 2 == 0) {
            details[extracted[i].toLowerCase().replace(/ /g, "_")] =
              extracted[i + 1];
          }
        }
        char[
          ele.children[1].children[0].data.toLowerCase().replace(/ /g, "_")
        ] = details;
      }
    }
  }

  if (Object.keys(char).length == 0) {
    char.name = title;
    char.details = "No details";
  }

  datalist.push(char);
  console.log(`${datalist.length}/${expectedLength}`);

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
