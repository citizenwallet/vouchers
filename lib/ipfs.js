import FormData from "form-data";
import fs from "fs";
import fetch from "isomorphic-fetch";
import { Readable } from "stream";

/**
 * Uploads a file or fetches content from a URL and pins it to IPFS using Pinata.
 *
 * @param {string} filename - The name of the file.
 * @param {string|Buffer} data - The file data or URL to fetch the content from.
 * @returns {Promise<string>} - The IPFS CID of the pinned file.
 * @throws {Error} - If the file type is unsupported or an error occurs during upload.
 */
export async function uploadToIPFS(filename, data) {
  let fileData, contentType, buffer;

  if (typeof data === "string" && data.startsWith("http")) {
    const response = await fetch(data);
    buffer = await response.buffer();

    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`);
    }
    contentType = response.headers.get("content-type");
    fileData = Readable.from(buffer);
  } else {
    // Determine the file type based on the extension
    const fileExtension = filename.split(".").pop().toLowerCase();
    if (fileExtension === "json") {
      contentType = "application/json";
      buffer = Buffer.from(JSON.stringify(data));
      fileData = Readable.from(buffer);
    } else if (["png", "jpg", "jpeg", "svg"].includes(fileExtension)) {
      contentType = `image/${fileExtension}`;
      fileData = Readable.from(data);
    } else {
      throw new Error("Unsupported file type");
    }
  }

  const formData = new FormData();

  // Create a new instance of FormData
  console.log(">>> uploadToIPFS", filename, contentType, typeof fileData);

  // Append the file data to the FormData object
  formData.append("file", fileData, filename);

  // Make a POST request to Pinata's IPFS endpoint
  const result = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
    body: formData,
  });

  if (result.ok) {
    const json = await result.json();
    return json.IpfsHash;
  } else {
    throw new Error(`Server responded with ${result.status}`);
  }
}

// Example usage

// Upload JSON data
// const jsonData = {
//   name: "My NFT",
//   description: "This is an example NFT with metadata",
//   image: "https://example.com/image.png",
//   minting_date: formatDate(new Date()), // Format the current date
// };

// const jsonFilename = "metadata.json";
// uploadToIPFS(jsonFilename, JSON.stringify(jsonData))
//   .then((ipfsCid) => console.log("JSON IPFS CID:", ipfsCid))
//   .catch((error) => console.error("Error:", error));

// // Upload an image file from a URL
// const imageUrl = "https://example.com/image.png";
// const imageFilename = "image.png";
// uploadToIPFS(imageFilename, imageUrl)
//   .then((ipfsCid) => console.log("Image IPFS CID:", ipfsCid))
//   .catch((error) => console.error("Error:", error));
