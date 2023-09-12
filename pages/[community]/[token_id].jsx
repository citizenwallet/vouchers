import Head from "next/head";

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://vouchers.citizenwallet.xyz"
    : "https://localhost:3000";

export async function getServerSideProps({ params }) {
  return {
    props: {
      community: params.community,
      token_id: params.token_id,
    },
  };
}

export default function Page({ community, token_id }) {
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
        <meta name="og:image" content={`${baseUrl}/voucher.jpg`} />
      </Head>
      <h1 className="text-3xl font-bold my-2">{`${community} voucher`}</h1>
      <p>Work in progress</p>
      <p>
        The goal is to let you mint your personal cheque of gratitude as an NFT
        that anyone can purchase and transfer to help you make a living working
        in the heart of your IKIGAI.
      </p>
      <img
        src={`/api/voucher.png?contract_chain=polygon&goodfor=&from=&date=${date}&token_id=${token_id}`}
        className="w-full my-4"
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
