const cheerio = require("cheerio");
const axios = require("axios").default;
const { writeFile } = require("fs");

let baseURL = "https://kingkiller.fandom.com";
let characters = [];
let expectedLength = 0;

async function pullCharacters() {
  try {
    let { data } = await axios.get(
      "https://kingkiller.fandom.com/wiki/Category:Characters"
    );
    let $ = cheerio.load(data);
    let charactersHTML = $("li.category-page__member > a");
    expectedLength = charactersHTML.length;
    for (let ele of charactersHTML) {
      if (!$(ele).text().includes("Category")) {
        pullSingleCharacter(baseURL + ele.attribs.href, $(ele).text());
      } else {
        expectedLength--;
      }
    }
    // pullSingleCharacter(
    //   baseURL + $("li.category-page__member > a")[0].attribs.href
    // );
  } catch (e) {
    console.error(e);
  }
}

async function pullSingleCharacter(url, title) {
  let { data } = await axios.get(url);
  let char = {};
  let $ = cheerio.load(data);
  for (let ele of $("aside")[0].children) {
    if ($(ele).attr("data-source") == "name") {
      char[$(ele).attr("data-source")] = $(ele).text();
    } else if (ele.name == "section") {
      let details = {};
      let extracted = [];

      let divs = ele.children.filter((ele) => ele.name == "div");

      for (let div of divs) {
        for (let prop of div.children) {
          if ($(prop).text().replace(/\n|\t/g, "")) {
            extracted.push($(prop).text());
          }
        }
      }

      for (let i = 0; i < extracted.length; i++) {
        if (i % 2 == 0) {
          details[extracted[i]] = extracted[i + 1];
        }
      }
      char[ele.children[1].children[0].data] = details;
    }
  }

  if (Object.keys(char).length == 0) {
    char.name = title;
    char.details = "No details";
  }

  characters.push(char);
  console.log(characters.length, expectedLength);

  if (characters.length == expectedLength)
    writeFile("./characters.json", JSON.stringify(characters), (err) => {
      if (err) return console.error(err);

      console.log("Overwrote characters.json file ✅");
    });
}

pullCharacters();
