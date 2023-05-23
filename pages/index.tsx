import Head from 'next/head'

const baseUrl = process.env.VERCEL_URL
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";

export default function Page() {
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
      </Head>
      <h1>Voucher generator</h1>
      <p>Example:</p>
      <img src={`${baseUrl}/api/voucher.png?contract_address=0x1234&goodfor=free%20cargobike%20ride&from=Xavier&date=2023-06-24`} />
      <p>Documentation: <a href="https://github.com/regensunite/vouchergenerator">https://github.com/regensunite/vouchergenerator</a> for more info.</p>
    </div>
  )
}
