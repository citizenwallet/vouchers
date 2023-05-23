import QRLogo from 'qr-with-logo';

export default async function handler(req, res) {

  console.log(req.query);

  const data = req.query.data;

  const qrlogodata = await QRLogo.generateQRWithLogo(data, "public/nft-logo.png", {}, "base64");

  res.setHeader('Content-Type', 'image/png');
  res.send(Buffer.from(qrlogodata, "base64"));
}
