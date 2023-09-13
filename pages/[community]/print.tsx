import Head from 'next/head'
import { fromBase62, toBase62 } from "../lib/lib";

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
      preview: query.preview || false
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
    width: '297mm',
    height: '210mm',
    margin: '0 auto',
    padding: '5mm 10mm 5mm 10mm'
  },
  voucher: {
    width: '4cm',
    height: '10cm',
    marginBottom: '0.02cm'
  }
}

export default function Page({totalPages, preview}) {

  // const tokenIdBase62 = getRandomTokenId();
  // console.log(">>> getRandomTokenId base62", tokenIdBase62);
  // console.log(">>> token id", fromBase62(tokenIdBase62));
  const cols = [];
  const rows = [];
  const pages = [];


  if (preview) {
    styles.page.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)';
    styles.page.backgroundColor = '#fff';
    styles.body.backgroundColor = '#ccc';
    styles.page.margin = '10px auto';
  }
  

  for (let i=0;i < 7; i++) {
    cols.push(<img style={styles.voucher} src={`${baseUrl}/api/token.png?contract_chain=polygon&contract_address=${contract_address}&token_id=${getRandomTokenId()}`} />);
  }

  for (let i=0;i < 2; i++) {
    rows.push(
      <div className="row1 flex flex-row">
        { cols.map(col => col) }
      </div>
    );
  }

  for (let i=0;i < totalPages; i++) {
    pages.push(
      <div style={styles.page}>
        <center>
          { rows.map(row => row) }
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
