import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'


/**
 * 
 * link for YT: https://youtu.be/oNlhptQmChc?t=2767 
 */

const Home: NextPage = () => {
  return (
    <div className=" bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Crypto Lottery Draw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />


    </div>
  )
}

export default Home
