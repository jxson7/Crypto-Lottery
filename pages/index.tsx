import { 
  useAddress,
  useMetamask,
  useContract,
  useDisconnect,
  useContractData,
  useContractCall,
  useAccount,

} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Login from '../components/Login'


/**
 * 
 * link for YT: https://youtu.be/oNlhptQmChc?t=4875
 */

const Home: NextPage = () => {

  const address = useAddress();
  console.log(address);

  if(!address) return (<Login/>)


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
