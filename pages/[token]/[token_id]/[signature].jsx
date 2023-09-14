import Head from "next/head";
import { verifyMessage } from "../../../lib/sign";
import moment from "moment";
import React, { useEffect, useState } from "react";

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://vouchers.citizenwallet.xyz"
    : "http://localhost:3000";

export async function getServerSideProps({ params }) {
  const message = `/${params.token.toUpperCase()}/${params.token_id}`;
  // console.log(">>> message", message, "signature", params.signature);
  let signer = null;
  try {
    signer = await verifyMessage(message, params.signature);
  } catch (e) {
    console.log("verifyMessage error:", e);
  }
  const valid = signer === process.env.SIGNER_ADDRESS;
  return {
    props: {
      signer,
      valid,
      token: params.token,
      token_id: params.token_id,
      signature: params.signature,
    },
  };
}

const styles = {
  voucher: {
    width: "4cm",
    height: "10cm",
    marginBottom: "0.015cm",
  },
};

function formatDate(dateString, locale) {
  try {
    // Set the locale for moment
    // moment.locale(locale);

    // Parse the date
    const date = moment(dateString, "YYYYMMDD");

    // Check if the date is valid
    if (!date.isValid()) {
      throw new Error("Invalid date");
    }

    // Format the date in a user-friendly way
    const formattedDate = date.format("LL");

    // console.log("Formatted date:", formattedDate);
    return formattedDate;
  } catch (error) {
    console.error("Failed to format date:", error);
  }
}
export default function Page({ token, token_id, signer, signature, valid }) {
  const tokenUrl = `${baseUrl}/${token.toUpperCase()}/${token_id}/${signature}`;
  // console.log(">>> tokenUrl", tokenUrl, "signer", signer, "valid", valid);
  const [validity, setValidity] = useState(valid); // Or any other variable

  useEffect(() => {
    if (validity) {
      document.body.classList.add("bg-green-700");
    } else {
      document.body.classList.add("bg-red-700");
    }

    // Cleanup function to remove the styles when the component is unmounted
    return () => {
      document.body.classList.remove("bg-green-700");
      document.body.classList.remove("bg-red-700");
    };
  }, [validity]);

  const validFrom = token_id.substring(0, 8);
  const validTill = token_id.substring(8, 16);
  return (
    <>
      <Head>
        <meta name="og:title" content={`${token} voucher`} />
        <meta
          name="og:description"
          content={`Voucher from the ${token} token`}
        />
        <meta name="og:image" content={`${baseUrl}/api/token.png`} />
      </Head>
      <div
        className={`overflow-hidden text-center ${
          valid ? "bg-green-700" : "bg-red-700"
        }`}
      >
        <h1 className="text-3xl font-bold my-2">{`${token} token`}</h1>
        <img
          className="mx-auto"
          key={tokenUrl}
          style={styles.voucher}
          src={`${baseUrl}/api/token.png?data=${encodeURIComponent(tokenUrl)}`}
        />
        {valid && (
          <div className="text-center my-3">
            This token can be redeemed for <strong>1</strong> {token}
            between {formatDate(validFrom)} and {formatDate(validTill)}.
          </div>
        )}
        {!valid && (
          <div className="text-center font-bold my-3">
            This token is not valid.
          </div>
        )}
      </div>
    </>
  );
}
