'use client'

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
import PaymentCard from './components/payment-card'
import ImagoSymbol from '@/components/icons/imago-symbol'



const marqueeList01 = [marquee_l1_s1, marquee_l1_s2, marquee_l1_s3, marquee_l1_s4, marquee_l1_s5];
const marqueeList02 = [marquee_l2_s1, marquee_l2_s2, marquee_l2_s3, marquee_l2_s4, marquee_l2_s5];
const marqueeList03 = [marquee_l3_s1, marquee_l3_s2, marquee_l3_s3, marquee_l3_s4, marquee_l3_s5];

export type SubscriptionPlan = {
    name: string,
    price: number,
    description: React.ReactNode,
    features: {
        name: string,
        price: number
    }[],
}

const subscription_faq = [
    {
        id: 1,
        question: "What’s the difference between the Individual and Team plans?",
        answer:
            "The Individual plan is designed for solo creators who want access to Intelligence+, Community+, Apps+, and Creator+. The Team plan includes everything in Individual plus DevSuite+ and AI-Integration+, which unlocks professional app/website development and AI-powered workflow integration for teams."
    },
    {
        id: 2,
        question: "What does Intelligence+ include?",
        answer:
            "Intelligence+ gives you access to advanced AI tools, smarter assistants, and priority usage. It’s your personal productivity booster, helping with research, content, and automation."
    },
    {
        id: 3,
        question: "What is Community+?",
        answer:
            "Community+ connects you with like-minded creators and innovators. You’ll gain access to discussions, support groups, premium resources, and opportunities to collaborate."
    },
    {
        id: 4,
        question: "What do I get with Apps+?",
        answer:
            "Apps+ unlocks exclusive access to Imago’s apps. In the Individual plan, you get basic versions, while the Team plan provides full-featured apps, updates, and collaboration tools."
    },
    {
        id: 5,
        question: "How does Creator+ work?",
        answer:
            "Creator+ provides tools for publishing, content creation, and collaboration. The Individual plan gives you starter tools, while the Team plan expands this with advanced creator suites."
    },
    {
        id: 6,
        question: "What is DevSuite+?",
        answer:
            "DevSuite+ is available in the Team plan. It means our team will help you build custom apps or websites tailored for your project or startup, saving you time and development costs."
    },
    {
        id: 7,
        question: "What is AI-Integration+?",
        answer:
            "AI-Integration+ is part of the Team plan and gives you custom AI workflows and automation integrated into your apps, websites, or business processes, making your operations more efficient."
    },
    {
        id: 8,
        question: "Can I upgrade from Individual to Team later?",
        answer:
            "Yes, you can upgrade at any time. Your remaining balance from the Individual plan will be adjusted toward the Team plan."
    },
    {
        id: 9,
        question: "Is there a free trial?",
        answer:
            "Currently, we don’t offer a free trial, but we provide detailed demos and walkthroughs so you know exactly what you’re getting before purchasing."
    },
    {
        id: 10,
        question: "Do you offer refunds?",
        answer:
            "We provide refunds only if you cancel within the first 7 days of purchase, provided you haven’t fully used premium services like DevSuite+ or AI-Integration+."
    }
];


const subscription_plans: SubscriptionPlan[] = [
    {
        name: "Individual",
        price: 195,
        description: (
            <p className=''>
                Perfect for solo innovators who want access to smarter tools and
                a supportive community. Unlock advanced intelligence features and
                connect with like-minded creators.
            </p>
        ),
        features: [
            { name: "Intelligence+", price: 80 },  // Core AI tools  
            { name: "Community+", price: 40 },     // Access to community & support  
            { name: "Apps+", price: 40 },          // Basic access to Imago apps  
            { name: "Creator+", price: 35 }        // Starter creator tools  
        ]
    },
    {
        name: "Team",
        price: 365,
        description: (
            <p>
                Designed for startups, teams, and creators who want to collaborate,
                build, and grow together. Get everything in Individual plus access
                to apps, creator tools, and advanced community perks.
            </p>
        ),
        features: [
            { name: "Intelligence+", price: 120 },
            { name: "Community+", price: 75 },
            { name: "Apps+", price: 70 },         // Access to your custom apps
            { name: "Creator+", price: 50 },      // Creator tools (publishing, collab tools)
            { name: "DevSuite+", price: 30 },     // Websites & app dev for the team
            { name: "AI-Integration+", price: 20 } // AI workflows, automation integration
        ]
    },
]


const ImagoOnePage = () => {
    const [openedFAQId, setOpenedFAQId] = React.useState<number[]>([])

    const toggleFAQ = (id: number) => {
        if (openedFAQId.includes(id)) {
            const filterRemoved = openedFAQId.filter(item => item !== id)
            setOpenedFAQId(filterRemoved)
        } else {
            setOpenedFAQId(prev => [...prev, id])
        }
    }
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
                <Marquee pauseOnHover className="[--duration:20s] [animation-play-state:paused]">
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
                        <MarqueeCard key={img.src} img={img.src} height='h-32' />
                    ))}
                </Marquee>
            </div>

            <div className='md:w-full max-w-[61rem] w-[92%] flex flex-col min-h-80 md:min-h-svh items-center justify-center'>
                <h1 className='md:text-7xl text-4xl font-semibold text-center'>
                    A world of <br className='md:hidden' /> world-class <br /> entertainment.
                </h1>
            </div>


            <div className='w-full min-h-screen flex flex-col items-center justify-center gap-10 bg-[#F5F5F7] py-20'>
                <h1 className='md:text-6xl text-4xl font-semibold flex flex-col items-center justify-center text-center'>
                    <span>The biggest bang,<br className='md:hidden' /> binge,<br className='not-md:hidden' /> and blast<br className='md:hidden' /> for your buck.</span>
                </h1>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 max-w-[40rem] w-[84%]'>
                    {
                        subscription_plans.map((plan) => (
                            <PaymentCard key={plan.name} plan={plan} />
                        ))
                    }
                </div>
            </div>


            <div className='w-full min-h-screen flex flex-col items-center justify-center py-20 gap-12 bg-black text-white'>
                <h1 className='md:text-6xl text-4xl font-bold text-center'>Questions? <br /> Answers.</h1>
                <div className='flex flex-col items-center justify-center gap-1 max-w-[40rem] w-[88%]'>
                    {
                        subscription_faq.map((faq, index) => (
                            <div key={faq.question} className={cn('w-full py-4 border-b-[0.25px] border-white/50 flex flex-col items-start justify-center gap-2', subscription_faq.length - 1 === index && 'border-b-0')}>
                                <button onClick={() => toggleFAQ(faq.id)} className='flex items-center justify-between w-full font-semibold cursor-pointer gap-4'>
                                    <h1 className=' md:text-2xl text-xl text-left'>{faq.question}</h1>
                                    <ImagoSymbol name='plus_circle' fontSize='24px' />
                                </button>
                                <p className={cn('text-white/70 max-w-[90%] font-medium overflow-clip transition-all duration-700', openedFAQId.includes(faq.id) ? 'max-h-64 pb-1' : 'max-h-0')}>{faq.answer}</p>
                            </div>
                        ))
                    }
                </div>
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

