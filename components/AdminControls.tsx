import React from 'react'
import {
    StarIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    ArrowUturnDownIcon,
} from '@heroicons/react/24/solid'
import {
    useContract,
    useContractData,
    useContractCall,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import toast from 'react-hot-toast';


function AdminControls() {

    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const { data: totalCommission } = useContractData(contract, "operatorTotalCommission");

    const { mutateAsync: DrawWinnerTicket } = useContractCall(contract, "DrawWinnerTicket");
    const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll");
    const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");
    const { mutateAsync: WithdrawCommission } = useContractCall(contract, "WithdrawCommission");


    const drawWinner = async () => {
        const notification = toast.loading("Drawing winner...");
        try {
            const data = await DrawWinnerTicket([{}]);
            toast.success("Winner drawn successfully!", { id: notification });
        }
        catch (err) {
            toast.error("Error drawing winner", { id: notification });
            console.error("Contract failure", err);
        }
    }

    const onRestartDraw = async () => {
        const notification = toast.loading("Restarting draw...");
        try {
            const data = await restartDraw([{}]);
            toast.success("Draw restarted successfully!", { id: notification });
        }
        catch (err) {
            toast.error("Error restarting draw", { id: notification });
            console.error("Contract failure", err);
        }
    }


    const onWithdrawCommission = async () => {
        const notification = toast.loading("Withdrawing commission...");
        try {
            const data = await WithdrawCommission([{}]);
            toast.success("Commission withdrawn successfully!", { id: notification });
        }
        catch (err) {
            toast.error("Error withdrawing commission", { id: notification });
            console.error("Contract failure", err);
        }
    }

    const onRefundAll = async () => {
        const notification = toast.loading("Refunding all...");
        try {
            const data = await RefundAll([{}]);
            toast.success("Refunded all successfully!", { id: notification });
        }
        catch (err) {
            toast.error("Error refunding all", { id: notification });
            console.error("Contract failure", err);
        }
    }






    return (
        <div className='text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border'>
            <h2 className='font-bold'>Admin Controls</h2>
            <p className='mb-5'>Total Commission to be withdrawn:{" "}
                {totalCommission && ethers.utils.formatEther(totalCommission.toString())}{" "}{currency}
            </p>

            <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
                <button onClick={drawWinner} className='admin-buttons'>
                    <StarIcon className='h-6 mx-auto mb-2' />
                    Draw Winner</button>
                <button onClick={onWithdrawCommission} className='admin-buttons'>
                    <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
                    Withdraw Commission</button>
                <button onClick={onRestartDraw} className='admin-buttons'>
                    <ArrowPathIcon className='h-6 mx-auto mb-2' />
                    Restart Draw</button>
                <button onClick={onRefundAll} className='admin-buttons'>
                    <ArrowUturnDownIcon className='h-6 mx-auto mb-2' />
                    Refund All</button>

            </div>
        </div>
    )
}

export default AdminControls