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
      totalPages: query.pages || 1
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
    padding: '10mm',
    backgroundColor: '#fff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  },
  voucher: {
    width: '6.25in',
    height: '2.75in',
    marginBottom: '0.1cm'
  }
}

export default function Page({totalPages}) {

  // const tokenIdBase62 = getRandomTokenId();
  // console.log(">>> getRandomTokenId base62", tokenIdBase62);
  // console.log(">>> token id", fromBase62(tokenIdBase62));

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
    <div>
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
        {pages.map(page => page)}
    </div>
  )
}
