import * as React from "react";
import { ImageResponse } from "@vercel/og";
import { fromBase62 } from "../../lib/lib";

export const config = {
  runtime: "edge",
};

const fetchFont = async (fontPath) => {
  if (!fontPath.href) {
    console.error("Invalid fontPath", fontPath);
    return;
  } else {
    console.log("fontPath.href is set", fontPath.href);
  }
  try {
    const res = await fetch(fontPath);
    return await res.arrayBuffer();
  } catch (e) {
    console.log("fetch error:", e);
  }
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const goodfor = searchParams.get("goodfor");
  const date = searchParams.get("date");
  const signature = searchParams.get("signature");
  const contract_chain = searchParams.get("contract_chain") || "";
  const contract_address = searchParams.get("contract_address");
  const token_id = searchParams.get("token_id");
  const qrcode_content = `https://vouchers.citizenwallet.xyz/regensunite/${token_id}`;
  const tokenid = searchParams.get("tokenid");

  // const qrcodeData = `https://${process.env.APP_URL}/#/vouchers/${contract_address}/${tokenid}`;

  const fonts = [
    {
      name: "typewriter",
      data: await fetchFont(
        new URL("../../assets/typewriter.ttf", import.meta.url)
      ),
      style: "normal",
    },
    {
      name: "barlow",
      data: await fetchFont(
        new URL("../../assets/barlow.bold.ttf", import.meta.url)
      ),
      style: "bold",
    },
    {
      name: "barlow",
      data: await fetchFont(
        new URL("../../assets/barlow.extrabold.ttf", import.meta.url)
      ),
      style: "extrabold",
    },
    {
      name: "MICR E",
      data: await fetchFont(
        new URL("../../assets/micrenc.ttf", import.meta.url)
      ),
      style: "normal",
    },
  ];

  const baseUrl = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";

  const styles = {
    voucher: {
      height: "550px",
      width: "1250px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      backgroundImage: `url("${baseUrl}/background-horizontal.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      position: "relative",
    },
    illustration: {
      position: "absolute",
      top: "50px",
      left: "50px",
      height: "450px",
    },
    title: {
      position: "absolute",
      top: "50px",
      left: "535px",
      height: "100px",
    },
    form: {
      position: "absolute",
      display: "flex",
      top: "175px",
      left: "580px",
      width: "500px",
    },
    label: {
      fontFamily: "barlow",
      fontStyle: "bold",
      fontSize: "1.2em",
      color: "rgb(69,55,78)",
      flexWrap: "nowrap",
      whiteSpace: "nowrap",
    },
    inputText: {
      borderColor: "rgb(231,125,48)",
      marginLeft: "90px",
      width: "400px",
    },
    inputValues: {
      color: "black",
      whiteSpace: "nowrap",
      position: "absolute",
      left: "100px",
      bottom: "11px",
      fontSize: "1.2em",
      fontFamily: "typewriter",
    },
    logo: {
      position: "absolute",
      bottom: "30px",
      left: "30px",
      width: "80px",
    },
    serialNumberLine: {
      position: "absolute",
      left: 450,
      bottom: 30,
      fontFamily: "MICR E",
      display: "flex",
      fontSize: "1em",
      color: "#777",
    },
    serialNumber: { fontFamily: "MICR E", fontSize: "1.5em", top: "-5px" },
  };

  return new ImageResponse(
    (
      <div style={styles.voucher}>
        <img
          src={`${baseUrl}/voucher-illustration.png`}
          style={styles.illustration}
        />

        <img src={`${baseUrl}/voucher-title.png`} style={styles.title} />

        <img
          src={`${baseUrl}/regensunite-logo-green.png`}
          style={styles.logo}
        />

        <img
          src={`${baseUrl}/api/qrcode.png?data=${encodeURIComponent(
            qrcode_content
          )}`}
          width={100}
          height={100}
          style={{
            position: "absolute",
            top: 412,
            right: 32,
          }}
        />

        <form style={styles.form} tw="flex flex-col">
          <div tw="flex flex-row mb-4 mt-4">
            <label style={styles.label} tw="font-medium mb-2">
              Good for
            </label>
            <input
              style={styles.inputText}
              tw="block border-b w-full focus:outline-none"
              type="text"
              value="Enter the purpose"
            />
            <div style={styles.inputValues}>{goodfor}</div>
          </div>

          <div tw="flex flex-row mb-4 mt-4">
            <label style={styles.label} tw="block font-medium mb-2">
              From
            </label>
            <input
              style={styles.inputText}
              tw="border-b w-full focus:outline-none"
              type="text"
              placeholder="Enter your name"
            />
            <div style={styles.inputValues}>{from}</div>
          </div>

          <div tw="flex flex-row mb-4 mt-4 relative">
            <label style={styles.label} tw="block font-medium mb-2">
              Date
            </label>
            <input
              style={styles.inputText}
              tw="border-b w-full focus:outline-none"
              type="text"
              placeholder="Enter the date"
            />
            <div style={styles.inputValues}>{date}</div>
            <p tw="void-text text-gray-500 text-sm absolute bottom--3 right-1">
              void after one year
            </p>
          </div>

          <div tw="flex flex-row mb-4 mt-4">
            <label style={styles.label} tw="block font-medium mb-2">
              Signature
            </label>
            <input
              style={styles.inputText}
              tw="border-b w-full focus:outline-none"
              type="text"
              placeholder="Enter your signature"
            />
            <div style={styles.inputValues}>{signature}</div>
          </div>
        </form>

        <div
          tw=""
          style={{
            fontSize: "1.2em",
            position: "absolute",
            left: 700,
            top: 388,
          }}
        >
          {signature}
        </div>

        <div style={styles.serialNumberLine}>
          <span style={styles.serialNumber}>a </span>
          <span style={{ fontFamily: "typewriter" }}>
            NFT - {contract_chain.toUpperCase()} -{" "}
          </span>
          <span style={styles.serialNumber}>{token_id}</span>
          <span style={{ fontFamily: "typewriter" }}>- REGENS UNITE</span>
          <span style={styles.serialNumber}> b</span>
        </div>
      </div>
    ),
    {
      width: 1250,
      height: 550,
      fonts,
    }
  );
}
