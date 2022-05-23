/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

// import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ArrowUp from "../assets/images/arrow-up.svg";
import ArrowDown from "../assets/images/arrow-down.svg";

import { Coin, Today } from "../styles/pages/topday";
import useGetDay from "../hooks/useGetDay";
import { SkeletonWrapperElement, SkeletonCoin } from "../skeletons/coinTopDay";
import { BGContent } from "~/components/BGContent/styles";
import { getCrypto } from "~/api/getCrypto";
import LoadingCircle from "~/components/Loading";

interface TopDayPageProps {
  topcoins: any;
  handleLoggedChange: () => void;
}

export default function TopDay({
  topcoins,
  handleLoggedChange,
}: TopDayPageProps) {
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState([]);
  const [coinsPageLoading, setCoinsPageLoading] = useState(false);
  const day = useGetDay();

  const coinRef = useRef(null);

  useEffect(() => {
    const loadNfts = async () => {
      setCoinsPageLoading(true);
      const newCoins = await getCrypto(page);
      setCoins((oldCoins) => [...oldCoins, ...newCoins]);
      setCoinsPageLoading(false);
    };
    loadNfts();
  }, [page]);

  const handleScroll = (e: any) => {
    if (!coinRef.current) {
      return null;
    } else if (endReached(coinRef.current)) {
      setPage(page + 1);
    }
  };

  function endReached(props?: any) {
    return props.getBoundingClientRect().bottom < window.innerHeight;
  }

  window.addEventListener("scroll", handleScroll);

  const formatterToMoney = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  interface CoinProps {
    id: string;
    name: string;
    image: string;
    symbol: string;
    market_cap_rank: string;
    current_price: number;
    price_change_percentage_24h: number;
  }

  return (
    <>
      <Head>
        <title>PIZY House · Melhores Moedas do Dia</title>
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

      <Navbar handleLoggedChange={handleLoggedChange} />
      <main>
        <h1>Melhores Criptomoedas do Dia</h1>
        <Today>{day.dmy}</Today>
        {coins && (
          <>
            <Coin ref={coinRef}>
              {coins
                .sort((a, b) => (a.coin > b.coin ? -1 : 1))
                .map(
                  ({
                    id,
                    name,
                    image,
                    symbol,
                    market_cap_rank,
                    current_price,
                    price_change_percentage_24h,
                  }: CoinProps) => {
                    return (
                      <button
                        key={id}
                        className={"coin " + symbol}
                        onClick={() => {
                          window.location.href = `/coin/${id}`;
                        }}
                      >
                        <div className="about">
                          <p id="position">{market_cap_rank}</p>
                          <img src={image} alt={name} />
                          <div>
                            <span>{name}</span>
                            <p>{symbol}</p>
                          </div>
                        </div>
                        <div className="info">
                          <div className="prices">
                            <p>{formatterToMoney.format(current_price)}</p>
                            {(() => {
                              if (price_change_percentage_24h) {
                                if (price_change_percentage_24h < 0) {
                                  return (
                                    <>
                                      <span className="down">
                                        <Image
                                          src={ArrowDown}
                                          alt="Down Arrow"
                                          width={24}
                                          height={24}
                                        />{" "}
                                        {price_change_percentage_24h.toFixed(2)}
                                        %
                                      </span>
                                    </>
                                  );
                                } else if (price_change_percentage_24h === 0) {
                                  return null;
                                } else {
                                  return (
                                    <>
                                      <span className="up">
                                        <Image
                                          src={ArrowUp}
                                          alt="Up Arrow"
                                          width={24}
                                          height={24}
                                        />{" "}
                                        {price_change_percentage_24h.toFixed(2)}
                                        %
                                      </span>
                                    </>
                                  );
                                }
                              }
                            })()}
                          </div>
                          <a>
                            <i />
                          </a>
                        </div>
                      </button>
                    );
                  }
                )}
              {coinsPageLoading && <LoadingCircle />}
            </Coin>
          </>
        )}
      </main>
      <Footer />
      <BGContent />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1&sparkline=true"
  );
  const data = await response.json();

  return {
    props: {
      topcoins: data,
    },
  };
};
