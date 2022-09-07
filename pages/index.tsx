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
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { currency } from '../constants'
import CountdownTimer from '../components/CountdownTimer'
import toast from 'react-hot-toast'
import {Toaster} from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import AdminControls from '../components/AdminControls'

/**
 * 
 * link for YT: https://youtu.be/oNlhptQmChc?t=10357
 */

const Home: NextPage = () => {

  const address = useAddress();
  const [userTicket, setUserTicket] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const {contract, isLoading} = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  const { data : remainingTickets } = useContractData(contract, "RemainingTickets");
  const { data: currentWinningReward } = useContractData(contract, "CurrentWinningReward")
  const { data: ticketPrice } = useContractData(contract, "ticketPrice")
  const { data : ticketCommission } = useContractData(contract, "ticketCommission")
  const { data : expiration } = useContractData(contract, "expiration")
  const { data : tickets } = useContractData(contract, "getTickets")
  
  const {mutateAsync: BuyTickets} = useContractCall(contract, "BuyTickets");
  const {mutateAsync: WithdrawWinnings} = useContractCall(contract, "WithdrawWinnings");
  const {data: winnings} = useContractData(contract, "getWinningsForAddress",address)
  const {data: lastWinner} = useContractData(contract, "lastWinner");
  const {data: lastWinnerAmount} = useContractData(contract, "lastWinnerAmount");
  const {data: isLotteryOperator} = useContractData(contract, "lotteryOperator");
  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings...");
    try {

      await WithdrawWinnings([{}]);
      toast.success("Winnings withdrawn successfully!", {id: notification});

    }
    catch (err){
      toast.error("Error withdrawing winnings", {id: notification});

      console.error("Contract failure", err);
    }

    }

  

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress 
      === address ? total + 1 : total), 0
      );
      setUserTicket(noOfUserTickets);

      console.log(userTicket);

    },
    [tickets, address]);    


  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying tickets...");

    try{
      const data = await BuyTickets([
        {
         value: ethers.utils.parseEther(
          (
          Number(ethers.utils.formatEther(ticketPrice)) * quantity
          ).toString()
         ),
      },
      ]);
        toast.success("Tickets bought successfully!", {
          id: notification,
        });
        console.info("contract call success", data);
    }catch(err){
      console.error("contract call error", err);
            };
    };


  

  if(!address) return (<Login/>)


  if(isLoading) return(
    <Loading/>
    
  );


  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Crypto Lottery Draw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-1'>
      <Header />
      <Marquee className="bg-[#0A1F1C] p-5 mb-5" gradient={false} speed={100}>
        <div className='flex space-x-2 mx-10'>
          <h4 className='text-white font-bold'>Last Winning: 
          {lastWinner?.toString()}
          </h4>
          <h4 className='text-white font-bold'>Previous winnings: {" "}
          {
            lastWinnerAmount && ethers.utils.formatEther
            (lastWinnerAmount?.toString())}{" "}{currency}{" "}
          </h4>
        </div>

      </Marquee>

      {isLotteryOperator === address && (
        <div className='flex justify-center'>
          <AdminControls/>
        </div>
      )}


      {winnings > 0 &&(
        <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
          <button onClick={onWithdrawWinnings}className='p-4 bg-gradient-to-b from-orange-500 to-emerald-600 text-center rounded-xl w-full'>
            <p className='font-bold'>WINNER WINNER CHICKEN DINNER! </p>
            <p> Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "}{currency}</p>
            <br />
            <p className='font-semibold'> Click here to withdraw.</p>
          </button>
        </div>
      )}


      {/* next draw box */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex 
        md:flex-row items-start justify-center md:space-x-5">
          <div className = "stats-container">
          <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>
          <div className=' flex justify-between p-2 space-x-2'>
            <div className="stats">
              <h2 className='text-sm '> Total Pool </h2>
              <p className = "text-xl"> {currentWinningReward && ethers.utils.formatEther
              (currentWinningReward.toString())}{" "} {currency}</p>
            </div>
              <div className="stats">
              <h2 className='text-sm '> Tickets Remaining</h2>
              <p className='text-xl'> {remainingTickets?.toNumber()}</p>
            </div>
          </div>
          {/* countdown timer */}
          <div className='mt-5 mb-3'>
            <CountdownTimer/>


          </div>
          </div>
          

            <div className="stats-container space-y-2">
            <div className="stats-container">
            <div className='flex justify-between items-center text-white pb-2'>
              <h2>
                Price Per Ticket
              </h2>
              <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}{currency}</p>
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
                <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice?.toString())) * quantity}{" "}{currency}</p>
              </div>
              <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                <p>Service Fees</p>
                <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{" "}{currency}</p>
              </div>
              <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                <p>+ Network Fees</p>
                <p>TBC </p>
              </div>
            </div>
            <button 
            disabled={expiration?.toString() < Date.now().toString()|| 
              remainingTickets?.toNumber() === 0 
            }
            onClick={handleClick}
            className='mt-5 w-full bg-gradient-to-br 
            from-orange-500 to to-emerald-600 px-10 py-5 rounded-md
            text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100
              disabled:to-gray-600 disabled:cursor-not-allowed'>
              Buy {quantity} Tickets for {ticketPrice &&
              Number(ethers.utils.formatEther(ticketPrice?.toString())) * quantity}{" "}{currency}
            </button>
            </div>
              {userTicket > 0 && (
                <div className='stats'>
                  <p className='text-lg mb-2'> you have {userTicket} tickets in this draw</p>
                <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>
                  {Array(userTicket).fill("").map((_, index) => (
                    <p key = {index}
                    className='text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic'
                    >
                     {index + 1} </p>
                  ))}
                </div>
                </div>
              )}
            </div>
        </div>
      <div>
        <div>
        
        </div>
      </div>
      </div>

      <footer className='border-t border-emerald-500/20 flex items-center
      text-white justify-center p-5'>
        <img
        className='h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full'
        src="https://i.ibb.co/yRrSkyC/IMG-0093.jpg"
        alt=''
        
        
        />
        <p className='text-xs text-emerald-900 pl-5'>
          DISCLAIMER: This video is for educational purposes only. The content of this
          project are not for the purposes of gambling, or with the intention of becoming
          a lure to gamble. Instead, the information provided is for the purpose of learning
          and entertainment only. We are not liable for any losses that are incurred or 
          problems that arise at online casinos after reading and consideration of this 
          project and tutorial. 
          If you are gambling online utilizing information from this application/tutorial, you are 
          completely and totally at your own risk. 
        </p>



      </footer>
    </div>
  )
}

export default Home
