/* eslint-disable @next/next/no-img-element */
import ImagoIcon from '@/components/icons/imago-icon'
import { Marquee } from '@/components/magicui/marquee'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'
import {
    marquee_l1_s1,
    marquee_l1_s2,
    marquee_l1_s3,
    marquee_l1_s4,
    marquee_l1_s5,
    marquee_l2_s1,
    marquee_l2_s2,
    marquee_l2_s3,
    marquee_l2_s4,
    marquee_l2_s5,
    marquee_l3_s1,
    marquee_l3_s2,
    marquee_l3_s3,
    marquee_l3_s4,
    marquee_l3_s5
} from '../../../public/assets/one/index.js'



const marqueeList01 = [marquee_l1_s1, marquee_l1_s2, marquee_l1_s3, marquee_l1_s4, marquee_l1_s5];
const marqueeList02 = [marquee_l2_s1, marquee_l2_s2, marquee_l2_s3, marquee_l2_s4, marquee_l2_s5];
const marqueeList03 = [marquee_l3_s1, marquee_l3_s2, marquee_l3_s3, marquee_l3_s4, marquee_l3_s5];

const ImagoOnePage = () => {

    return (
        <div className='w-full min-h-0 flex flex-col items-center justify-start'>
            {/** Native Nav */}
            <nav className='w-full h-12 bg-black/50 backdrop-blur-lg sticky top-0 flex items-center justify-center z-50'>
                <div className='max-w-[61rem] md:w-full w-[92%] flex items-center justify-between'>
                    <h1 className='md:text-2xl text-xl font-medium text-white'>Imago One</h1>
                    <Button className='rounded-full bg-white/95 transition-colors duration-300 cursor-pointer hover:bg-white text-black py-1 h-6 px-3'>
                        Try it free*
                    </Button>
                </div>
            </nav>

            <div className='md:w-full max-w-[61rem] w-[92%] flex flex-col min-h-[calc(100vh-15rem)] md:min-h-svh items-center justify-center'>
                <div className='text-center flex flex-col items-center gap-2'>
                    <h1 className='font-medium md:text-7xl text-4xl flex items-baseline gap-0.5'>
                        <ImagoIcon className='md:size-12 size-6' />
                        One
                    </h1>
                    <h1 className='font-bold md:text-8xl text-6xl'>
                        The best
                        <br className='md:hidden block' />
                        {" "} of Imago.
                        <br />
                        All in one.
                    </h1>
                    <h3 className='md:text-2xl text-xl px-5 md:px-0 font-semibold tracking-[0.00528px] my-4'>
                        Imago One brings AI image generation, a smart chatbot, a website builder, and more — all in one affordable bundle. Share with up to five others, each with private access.
                        Create more. Do more. All in one.
                    </h3>

                    <Button className='rounded-full bg-black text-white hover:bg-[#1D1D1F] text-lg h-11 px-5 cursor-pointer'>
                        Try Imago One free*
                    </Button>
                </div>


            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-x-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {marqueeList01.map((img) => (
                        <MarqueeCard key={img.src} img={img.src} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:18s]">
                    {marqueeList02.map((img) => (
                        <MarqueeCard key={img.src} img={img.src} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:16s]">
                    {marqueeList03.map((img) => (
                        <MarqueeCard key={img.src} img={img.src} height='h-32'/>
                    ))}
                </Marquee>
            </div>

        </div>
    )
}

export default ImagoOnePage



const MarqueeCard = ({ img, height }: { img: string, height?: string }) => {
    return (
        <div className={cn("relative h-full w-64 cursor-pointer rounded-lg border overflow-clip", height)}>
            <img className="object-cover w-full h-full" width={32} height={32} alt="" src={img} />
        </div>
    )
}