/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

// import Header from "../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SignIn({
  coindata,
  actualState,
  loggedStatus,
  handleLoggedChange,
}: any) {
  return (
    <>
      <Head>
        <title>PIZY House · Entrar na sua conta</title>
        <meta
          name="description"
          content="A empresa tem como foco a criação de novos investidores que no futuro podem influenciar no mercado de ações com a utilização de moedas criptografadas e tudo sobre esse novo mundo tecnológico."
        />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <Navbar
        actualState={actualState}
        loggedStatus={loggedStatus}
        handleLoggedChange={handleLoggedChange}
      />
      <main>
        <h1>{coindata.name}</h1>
        <div
          style={{
            width: "350px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p>
            {coindata.id} | {coindata.symbol}
          </p>
          <img src={coindata.image.large} alt={coindata.id} />
          {/* <p>{coindata.market_data.sparkline_7d.price}</p> */}
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/`);
  const data = await response.json();

  const paths = data.map((coin: any) => {
    return { params: { id: coin.id } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id }: any = context.params;

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`
  );
  const data = await response.json();

  return {
    props: {
      coindata: data,
      revalidate: 5,
    },
  };
};
