import React from 'react'
import type { SubscriptionPlan } from '../page'
import ImagoIcon from '@/components/icons/imago-icon'
import ImagoSymbol from '@/components/icons/imago-symbol'
import { cn } from '@/lib/utils'

interface PaymentCardProps {
    plan: SubscriptionPlan
}

const PaymentCard = ({ plan }: PaymentCardProps) => {
    const [openedBreakdown, setOpenedBreakdown] = React.useState(false)
    const toggleBreakdown = () => {
        setOpenedBreakdown(!openedBreakdown)
    }
    return (
        <div className={cn(' rounded-xl p-10 bg-white flex flex-col min-h-[24rem] gap-1.5 justify-between relative overflow-clip transition-colors duration-300', openedBreakdown && 'bg-[#E8E8ED]')}>
            <div className='flex flex-col gap-1.5'>
                <h1 className='text-2xl font-semibold'>{plan.name}</h1>
                <h1 className={cn('text-3xl font-bold', plan.name === 'Individual' ? "text-orange-500" : "text-red-500")}>{"₹" + plan.price + "/month"}</h1>
                {plan.description}
            </div>

            <div className='h-[0.75px] w-full bg-black rounded-full my-5' />

            <div className='flex flex-col gap-0.5'>
                {
                    plan.features.map((feature, idx) => (
                        <div key={idx} className='flex items-center justify-between w-full '>
                            <div className='flex items-center gap-0.5'>
                                <ImagoIcon size={12} className='' />
                                <span className='font-semibold'>{feature.name}</span>
                            </div>
                            <h1 className={cn(openedBreakdown ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-300')}>
                                ₹{feature.price}/month
                            </h1>
                        </div>
                    ))
                }

                <div className='flex items-center justify-end mt-6'>
                    <div className={cn('w-[40%] border-t border-black py-4 flex items-center justify-center transition-opacity duration-300', openedBreakdown ? 'opacity-100' : 'opacity-0')}>
                        <h1>{"₹" + plan.price + "/month"}</h1>
                    </div>
                </div>
            </div>


            <div className='w-full flex flex-col gap-2 items-center justify-center self-center mt-6'>
                <button onClick={toggleBreakdown} className={cn('rounded-full p-2 flex items-center gap-2 w-full border border-black justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer', openedBreakdown ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto')}>
                    See price breakdown
                    <ImagoSymbol name='plus_circle' fontSize='18px' />
                </button>
                <button onClick={() => window.open(plan.link)} className='rounded-full p-2 flex items-center gap-2 w-full border text-white bg-black border-black justify-center  hover:bg-transparent hover:text-black transition-colors duration-300 cursor-pointer'>
                    Purchase now
                </button>
            </div>


            <button onClick={toggleBreakdown} className={cn('absolute right-8 top-8 cursor-pointer', openedBreakdown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
                <ImagoSymbol name='minus_circle' fontSize='28px' />
            </button>
        </div>
    )
}

export default PaymentCard