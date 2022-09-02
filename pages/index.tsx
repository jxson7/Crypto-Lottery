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
import Loading from '../components/Loading'
import Login from '../components/Login'
import { useState } from 'react'


/**
 * 
 * link for YT: https://youtu.be/oNlhptQmChc?t=4875
 */

const Home: NextPage = () => {

  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  console.log(address);


  if(!address) return (<Login/>)


  if(isLoading) return(
    <Loading/>
    
  );


  return (
    <div className=" bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Crypto Lottery Draw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

    {/* next draw box */}

      <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
        <div className = "stats-container">
        <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>
        <div className=' flex justify-between p-2 space-x-2'>
          <div className="stats">
            <h2 className='text-sm '> Total Pool </h2>
            <p className = "text-xl"> 0.1 MATIC</p>
          </div>
            <div className="stats">
            <h2 className='text-sm '> Tickets Remaining</h2>
            <p className='text-xl'> 100 Tickets Remaining</p>
          </div>
        </div>
        {/* countdown timer */}
        </div>
        

          <div className="stats-container space-y-2">
          <div className="stats-container">
          <div className='flex justify-between items-center text-white pb-2'>
            <h2>
              Price Per Ticket
            </h2>
            <p>0.01 MATIC</p>
          </div>


          <div className='flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4'>
            <p> TICKETS</p>
            <input className="flex w-full bg-transparent text-right outline-none" 
            type="number" 
            min={1}
            max={10}
            value = {quantity}
            onChange= {e => setQuantity(Number(e.target.value))}
            />
          </div>


          <div className='space-y-2 mt-5'>
            <div className='flex items-center justify-between text-emerald-300 text-sm italic font-extrabold'>
              <p>Total Cost of Tickets</p>
              <p>0.999</p>
            </div>
            <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
              <p>Service Fees</p>
              <p>0.001 MATIC</p>
            </div>
            <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
              <p>+ Network Fees</p>
              <p>TBC </p>
            </div>
          </div>
          <button>
            Buy Tickets
          </button>
          </div>
          </div>
      </div>


    {/* price per ticket box */}
    <div>
      <div>
        
      </div>
    </div>

    </div>
  )
}

export default Home
