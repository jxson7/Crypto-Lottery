import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

function Loading() {
  return (
    <div className="bg-[#091B18] h-screen flex flex-col items-center justify-center">
      <div className="flex item-center space-x-2 mb-10">
        <img className="rounded-full h-20 w-20"
        src="https://i.ibb.co/yRrSkyC/IMG-0093.jpg"
          alt="" />
        <h1 className='text-lg text-white font-bold'> Loading the Crypto Lottery Draw</h1>
      </div>
      <PropagateLoader color="white" size={30} />  // loading animation
      
    </div>
  )
}

export default Loading