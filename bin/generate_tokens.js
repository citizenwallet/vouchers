const {
  signMessage,
  getPublicKey,
  generateRandomBase64UrlSafeString,
} = require("../lib/sign");

const token = process.argv[2];
const validityRange = process.argv[3];

// console.log(">> public key", getPublicKey());

if (process.argv.length < 5) {
  console.error(
    "Please provide a token ticker (XXX), the validity range (YYYYMMDDYYYYMMDD) and the number of tokens to generate"
  );
  console.log("E.g. node bin/generate_tokens.js RGN 20231231 10 > tokens.json");
  process.exit(1);
}

if (!token || token.length !== 3) {
  console.error("Please provide a 3-letter token ticker");
  process.exit(1);
}

if (!validityRange || validityRange.length !== 16) {
  console.error(
    "Please provide a validity range in the format YYYYMMDDYYYYMMDD"
  );
  process.exit(1);
}

const numberTokens = process.argv[4] || 10;

const d = new Date();
const month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
const date = d.getFullYear() + month + day;
const tokens = [];

async function main() {
  for (let i = 0; i < numberTokens; i++) {
    const rand = await generateRandomBase64UrlSafeString(6);
    const token_id = validityRange + rand;
    const path = "/" + token.toUpperCase() + "/" + token_id;
    const signature = await signMessage(path);
    tokens.push(path + "/" + signature);
  }
  console.log(JSON.stringify(tokens, null, "  "));
}

main().then(() => process.exit(0));
