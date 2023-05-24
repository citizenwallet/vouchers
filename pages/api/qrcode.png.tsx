import QRLogo from 'qr-with-logo';

const baseUrl = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

export default async function handler(req, res) {

  console.log(req.query);

  const data = req.query.data;

  const qrlogodata = await QRLogo.generateQRWithLogo(data, `${baseUrl}/nft-logo.png`, {}, "base64");

  res.setHeader('Content-Type', 'image/png');
  res.send(Buffer.from(qrlogodata, "base64"));
}
