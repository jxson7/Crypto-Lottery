import React from 'react'
import NavButton from './NavButton';
import {Bars3BottomRightIcon} from "@heroicons/react/24/solid"

function Header() {
  return (
    <div className="gird grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
        <div className="flex item-center space-x-2">
            <img 
            className="rounded-full h-20 w-20"
            src="https://i.pinimg.com/originals/8d/af/b4/8dafb4099c6ff7d770a279be6cf84eb1.jpg" 
            alt= "" 
            />
        </div>
        <div>
            <h1 className="text-lg text-white font-bold ">Crypto Lottery Draw</h1>
            <p className="text-xs text-emerald-500 truncate">
                User: ...
            </p>
        </div>
        <div>
            <div className=" hidden md:flex md:col-span-3 items-center justify-center rounded-md">
                <div className='bg-[#0A1F1C] p-4 space-x-2'>
                    <NavButton isActive title="Buy Tickets" />
                    <NavButton title="Logout" />

                </div>
            </div>
        </div>

        <div className="flex flex-col ml-auto text-right">
            <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer'/>
            <span className='md:hidden'>
            <NavButton title="Logout" />
            </span>
        
        
        </div>

       


    </div>
  )
}

export default Header;
