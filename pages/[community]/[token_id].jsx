import Head from "next/head";
import { useRouter } from "next/router";

const baseUrl = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

export default function Page() {
  const router = useRouter();
  const { community, token_id } = router.query;

  const d = new Date();
  const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  return (
    <div>
      <Head>
        <meta name="og:title" content={`${community} voucher`} />
        <meta
          name="og:description"
          content={`Voucher from the ${community} community`}
        />
        <meta
          name="og:image"
          content={`${
            process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
          }/voucher.jpg`}
        />
      </Head>
      <h1>{`${community} voucher`}</h1>
      <p>Work in progress</p>
      <p>
        The goal is to let you mint your personal cheque of gratitude as an NFT
        that anyone can purchase and transfer to help you make a living working
        in the heart of your IKIGAI.
      </p>
      <img
        src={`${baseUrl}/api/voucher.png?contract_chain=polygon&goodfor=&from=&date=${date}&token_id=${token_id}`}
      />
      <p>
        To stay up to date with this project, follow{" "}
        <a href="https://twitter.com/citizenwallet">@citizenwallet</a> and{" "}
        <a href="https://twitter.com/regensunite">@regensunite</a>.<br />
        Open source code:{" "}
        <a href="https://github.com/citizenwallet/vouchers">
          https://github.com/citizenwallet/vouchers
        </a>{" "}
        for more info.
      </p>
    </div>
  );
}
