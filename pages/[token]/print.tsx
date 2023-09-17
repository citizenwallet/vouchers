import Head from 'next/head'



import tokens from "../../tokens.json";
import React, { useEffect } from "react";

const productionUrl = "https://vouchers.citizenwallet.xyz";

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? productionUrl
    : "http://localhost:3000";

const tokensPerPage = 30;
const tokensPerRow = 10;
const rows = [0, 1, 2];

export async function getServerSideProps({ params, query }) {
  const totalPages = Math.min(query.pages || 1, Math.ceil(tokens.length / tokensPerPage)) || 1;

  return {
    props: {
      token: params.token,
      totalPages,
      preview: query.preview === '1' || false
    }
  }
}

const styles = {
  body: {
    margin: '0',
    padding: '0'
  },
  page: {
    width: '297mm',
    // height: '210mm',
    margin: '0 auto',
    padding: '3mm 6mm',
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    overflow: 'hidden',
  },
  voucher: {
    width: '2.7cm',
    // height: '10cm',
    marginRight: '0.025cm',
    marginBottom: '0.02cm'
  }
}

function getTokenUrl(index) {
  return `${productionUrl}${tokens[index]}`;
}

function renderTokenImages(start, count) {
  const tokenImages = [];
  for (let i=start; i < start + count; i++) {
    if (i < tokens.length) {
      tokenImages.push(<img id={`token${i}`} key={`token${i}`} className="token" style={styles.voucher} src={`${baseUrl}/api/token.png?data=${getTokenUrl(i)}`} />);
    }
  }
  return tokenImages.map(ti => ti);
}

function renderRow(page, row) {
  const key = `page${page}-row${row}`;
  return (<div key={key} id={key} className="row" style={styles.row}>{renderTokenImages(page * tokensPerPage + row * tokensPerRow, tokensPerRow)}</div>);
}

export default function Page({totalPages, preview}) {

  const pages = [];

  useEffect(() => {
    if (preview) {
      document.body.classList.add("preview");
    }

    // Cleanup function to remove the styles when the component is unmounted
    return () => {
      document.body.classList.remove("preview");
    };
  }, [preview]);

  for (let i=0;i < totalPages; i++) {
    const key = `page${i}`;
    pages.push(
      <div key={key} id={key} className="page" style={styles.page}>
        { rows.map(row => renderRow(i, row)) }
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
          content={`${baseUrl}/voucher.jpg`}
        />
         <link rel="stylesheet" href="/styles/print.css" />
      </Head>
      <div style={styles.body}>
        {pages.map(page => page)}
      </div>
    </>
  )
}
