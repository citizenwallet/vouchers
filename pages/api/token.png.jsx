import * as React from "react";
import { ImageResponse } from "@vercel/og";
import { fromBase62 } from "../../lib/lib";

export const config = {
  runtime: "experimental-edge",
};

const fetchFont = async (fontPath) => {
  if (!fontPath.href) {
    console.error("Invalid fontPath", fontPath);
    return;
  } else {
    // console.log("fontPath.href is set", fontPath.href);
  }
  try {
    const res = await fetch(fontPath);
    return await res.arrayBuffer();
  } catch (e) {
    console.error("fetch error:", e);
  }
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);

  const data = searchParams.get("data");

  const baseUrl = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";

  const styles = {
    voucher: {
      height: "825px",
      width: "330px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      // backgroundImage: `url("${baseUrl}/background-horizontal.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      position: "relative",
    },
    illustration: {
      position: "absolute",
      top: "0px",
      left: "0px",
      height: "825px",
      width: "330px",
    },
  };

  return new ImageResponse(
    (
      <div style={styles.voucher}>
        <img
          src={`${baseUrl}/regensunite-token-white.jpg`}
          style={styles.illustration}
        />

        <img
          src={`${baseUrl}/api/qrcode.png?data=${encodeURIComponent(data)}`}
          width={240}
          height={240}
          style={{
            position: "absolute",
            top: 425,
            left: 50,
          }}
        />
      </div>
    ),
    {
      width: 330,
      height: 825,
    }
  );
}
