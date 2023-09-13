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
  // const qrcode_content = `https://vouchers.citizenwallet.xyz/regensunite/${token_id}`;
  const qrcode_content = `https://app.citizenwallet.xyz/#/?voucher=H4sIAAho_2QA_0WP2WoDMQxF_8XPM-BFtuX8jVYamrRhJoSW0n-vpwv1g4yFdH3OR5Dt_XZ_DaePIOfbk23hFMj2NWVc5b6F5bd9o42u-zF2fswRbo1ZS5IcPSM1YNSh7sMYhUnD59_i3d7uc6FlNGvaBLoNEBtVoRSqnG0eJ2XxFlPs1GXGRGmNAIHLGIoJ-gR5Vp9B-zfwz_MfSp8v9hJOJS9hXrNOD1zCLZzSEna6fCPojCtWuSjUkWoGdMbRjGyyA1ga80tyTqmag7kSKYKOgbEnSofTlWQmiSY18lGqZHRtHgeOmtRncC6tE3YWIJmqZYoyojHHQiw8NCocSWc9kBKwa8lr7CYruNBKXfNaE5ZSPWseh_nDtv38evh9fgH9qudzsQEAAA==&params=H4sIAAho_2QA_wXBQQ5AMBAAwK_05Chb2tUeemH5gHDf0IYEbYrE883wsfPtOKViyZ6fmB18CrBvbaNrZc1gKoJgV5CaJGJoaIDVaGBELC4-vZvju2w-ixCzgFKKaaTuB3fA83pWAAAA${token_id}`;
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
          src={`${baseUrl}/api/qrcode.png?data=${encodeURIComponent(
            qrcode_content
          )}`}
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
      fonts,
    }
  );
}
