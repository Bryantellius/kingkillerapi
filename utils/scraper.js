const cheerio = require("cheerio");
const axios = require("axios").default;

let baseURL = "https://kingkiller.fandom.com";

async function pullCharacters() {
  try {
    let { data } = await axios.get(
      "https://kingkiller.fandom.com/wiki/Category:Characters"
    );
    let $ = cheerio.load(data);
    for (let ele of $("li.category-page__member > a")) {
      pullSingleCharacter(baseURL + ele.attribs.href);
    }
  } catch (e) {
    console.error(e);
  }
}

async function pullSingleCharacter(url) {
  let { data } = await axios.get(url);
  let $ = cheerio.load(data);
  for (let ele of $(".pi-data")) {
    console.log(ele);
  }
}

pullCharacters();
