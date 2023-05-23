import { ImageResponse } from "@vercel/og";
import { uploadToIPFS } from "../../lib/ipfs";
import { formatDate } from "../../lib/lib";

export default async function mint(req, res) {
  function error(errorMsg) {
    return res.status(500).json({
      error: errorMsg,
    });
  }

  const {
    id,
    name,
    description,
    minter_name,
    minter_address,
    contract_chain,
    contract_address,
  } = req.query || {};

  const metadata = {
    name,
    description,
    minter_name,
    minter_address,
    contract_chain,
    contract_address,
    minting_date: formatDate(),
  };

  // validation
  if (!id) return error("Please provide an id (the token id)");
  if (!name) return error("Please provide a name for the NFT");
  if (!description) return error("Please provide a description for the NFT");
  if (!minter_name) return error("Please provide a minter_name");
  if (!minter_address || !minter_address.startsWith("0x"))
    return error("Please provide a valid minter_address");
  if (!contract_chain) return error("Please specify the contract_chain");
  if (!contract_address || !contract_address.startsWith("0x"))
    return error(
      "Please provide a valid contract_address (address of the NFT contract)"
    );

  const imageUrl = `${
    process.env.VERCEL_URL
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000"
  }/api/voucher.png?contract_address=${encodeURIComponent(
    metadata.contract_address
  )}&tokenid=${id}&from=${minter_name}&signature=${minter_address}&goodfor=${description}`;

  // we upload the NFT image
  const image_cid = await uploadToIPFS(
    `voucher.${contract_address}.${id}.png`,
    imageUrl
  );
  metadata.image = `ipfs://${image_cid}`;

  const metadata_cid = await uploadToIPFS("metadata.json", metadata);

  res.status(200).json({
    contract_address,
    metadata: `ipfs://${image_cid}`,
  });
}
