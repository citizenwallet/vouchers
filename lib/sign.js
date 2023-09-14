require("dotenv").config({ path: ".env.local" });
const { ethers } = require("ethers");
const crypto = require("crypto");

function generateRandomBase64UrlSafeString(length) {
  if (length <= 0) {
    throw new Error("Length should be a positive integer.");
  }

  // Calculate the necessary number of random bytes
  const byteLength = Math.ceil((length * 3) / 4);

  // Generate random bytes
  const randomBytes = crypto.randomBytes(byteLength);

  // Convert the bytes to a URL-safe base64 string
  let base64String = randomBytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Trim the string to the required length
  base64String = base64String.substring(0, length);

  return base64String;
}

async function signMessage(message) {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Please set your PRIVATE_KEY in the .env file");
  }

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const signedMessage = await wallet.signMessage(message);

  // Convert hex to bytes
  const bytes = Buffer.from(signedMessage.slice(2), "hex");

  // Convert bytes to base64 and make it URL-safe
  const base64Signature = bytes
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // console.log("URL-safe base64 signature:", base64Signature);
  return base64Signature;
}

function getPublicKey() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Please set your PRIVATE_KEY in the .env file");
  }
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  return wallet.address;
}

async function verifyMessage(message, base64Signature) {
  // Convert URL-safe base64 to standard base64, then to bytes, then to hex
  const hexSignature =
    "0x" +
    Buffer.from(
      base64Signature
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .replace(/[^A-Za-z0-9+/]/g, ""),
      "base64"
    ).toString("hex");

  const signingAddress = ethers.verifyMessage(message, hexSignature);
  // console.log("Signing address:", signingAddress);
  return signingAddress;
}

module.exports = {
  signMessage,
  verifyMessage,
  getPublicKey,
  generateRandomBase64UrlSafeString,
};
