import Head from 'next/head'

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
      <p>See <a href="https://github.com/regensunite/vouchergenerator">https://github.com/regensunite/vouchergenerator</a> for more info.</p>
    </div>
  )
}
