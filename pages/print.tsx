import Head from 'next/head'
import React, { useEffect } from "react";

const baseUrl = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";


function getRandomTokenId() {
  const offset = Math.pow(10,18); // makes sure all token ids are of the same length
  const MAX_VALUE = Math.pow(10, 19) - offset;

  // Generate a random number in the appropriate range.
  const randomNum = offset + Math.floor(Math.random() * MAX_VALUE);
  return randomNum;
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      totalPages: query.pages || 1,
      preview: query.preview === '1' || false
    }
  }
}

const contract_address = "";

const styles = {
  body: {
    margin: '0',
    padding: '0'
  },
  page: {
    width: '210mm',
    height: '297mm',
    margin: '0 auto',
    padding: '10mm'
  },
  voucher: {
    width: '6.25in',
    height: '2.75in',
    marginBottom: '0.015cm'
  }
}

export default function Page({totalPages, preview}) {

  useEffect(() => {
    if (preview) {
      document.body.classList.add("preview");
    }

    // Cleanup function to remove the styles when the component is unmounted
    return () => {
      document.body.classList.remove("preview");
    };
  }, [preview]);

  const pages = [];
  for (let i=0;i < totalPages; i++) {
    pages.push(
      <div style={styles.page}>
        <center>
          <img style={styles.voucher} src={`${baseUrl}/api/voucher.png?contract_chain=polygon&contract_address=${contract_address}&token_id=${getRandomTokenId()}`} />
          <img style={styles.voucher} src={`${baseUrl}/api/voucher.png?contract_chain=polygon&contract_address=${contract_address}&token_id=${getRandomTokenId()}`} />
          <img style={styles.voucher} src={`${baseUrl}/api/voucher.png?contract_chain=polygon&contract_address=${contract_address}&token_id=${getRandomTokenId()}`} />
          <img style={styles.voucher} src={`${baseUrl}/api/voucher.png?contract_chain=polygon&contract_address=${contract_address}&token_id=${getRandomTokenId()}`} />
        </center>
      </div>
    )
  }
  

  return (
    <>
      <Head>
        <meta name="og:title" content="Voucher Generator" />
        <meta name="og:description" content="Voucher Generator" />
        <meta
          name="og:image"
          content={`${
              process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
            }/voucher.jpg`}
        />
         <link rel="stylesheet" href="/styles/print.css" />
      </Head>
      <div style={styles.body}>
        {pages.map(page => page)}
      </div>
    </>
  )
}
