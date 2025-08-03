import React from 'react'
import LegalHero from '../../../public/assets/legal/legal-hero.webp'
import Link from 'next/link'
import ImagoSymbol from '@/components/icons/imago-symbol'

const policyBlocksData = [
    {
        id: 1,
        title: "Imago Intelligence Policy",
        description: "Understand how Imago Intelligence interacts with your inputs, processes data, and ensures your privacy is respected during AI interactions.",
        hrefs: [
            { label: "Read Privacy Policy", url: "/policy/privacy" }
        ],
        image: <div className="">
            <ImagoSymbol name='lock_shield_fill' fontSize='50px' />
        </div>,
    },
    {
        id: 2,
        title: "Imago App & Web Terms",
        description: "Review the terms that apply when using our mobile apps, web tools, and platform features — including iStore, webStore, and iEditor.",
        hrefs: [
            { label: "Read Terms of Service", url: "/policy/terms" }
        ],
        image: <div className="">
            <ImagoSymbol name='square_list_fill' fontSize='50px' />
        </div>,
    },
    {
        id: 3,
        title: "Submission & Content Guidelines",
        description: "Planning to share apps, designs, or feedback through our platform? Read the submission rules to ensure your content is safe, respectful, and original.",
        hrefs: [
            { label: "View Submission Guidelines", url: "/policy/submission" }
        ],
        image: <div className="">
            <ImagoSymbol name='doc_text' fontSize='50px' />
        </div>,
    },
    {
        id: 4,
        title: "Developer Access & SDK Usage",
        description: "For developers using our APIs, SDKs, or integrating into Imago, this agreement explains what you’re allowed to build, share, and distribute.",
        hrefs: [
            { label: "View Developer Agreement", url: "/policy/developer" }
        ],
        image: <div className="">
            <ImagoSymbol name='hammer_fill' fontSize='50px' />
        </div>,
    },
]


function PolicyPage() {
    return (
        <main className='w-full min-h-screen flex flex-col items-center justify-start gap-28 mb-32 bg-white'>
            <section
                className='w-full flex flex-col items-center justify-center lg:h-[70vh] h-[40vh] lg:gap-3 gap-2 text-black'
                style={{
                    backgroundImage: `url(${(LegalHero).src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'start',
                    backgroundSize: 'cover'
                }}
            >
                <h1 className='lg:text-5xl text-4xl font-semibold '>Imago Legal</h1>
                <h6 className='text-xl w-80 text-center'>Find legal information and resources
                    for Imago apps and services.</h6>
            </section>


            <section className='lg:max-w-[61rem] w-[88%] flex flex-wrap gap-1.5 space-y-16 items-center justify-between'>
                {
                    policyBlocksData.map((data) => (
                        <div key={data.id} className='flex flex-col gap-3 lg:w-[40%] w-full items-start'>
                            {data.image}
                            <h1 className='text-[26px] font-semibold'>{data.title}</h1>
                            <p className='text-lg text-muted-foreground'>{data.description}</p>
                            <Link href={data.hrefs[0]?.url ?? "/"} className='flex items-center group text-theme gap-0.5'>
                                <span className='group-hover:underline'>
                                    {data.hrefs[0]?.label}
                                </span>
                                <ImagoSymbol name='chevron_right' fontSize='14px' />
                            </Link>
                        </div>
                    ))
                }

            </section>


            <section className='min-h-20 flex items-center justify-center text-center w-full'>
                <Link href={'/policy/privacy'} className='lg:text-xl text-xl items-center inline-flex group text-theme gap-0.5 font-bold lg:w-auto w-80'>
                    <span className='group-hover:underline'>
                    Not sure where to begin? Learn how we handle your data
                    </span>
                    <ImagoSymbol name='chevron_right' fontSize='16px' styles={{ fontWeight: 'bold' }} />
                </Link>
            </section>
        </main>
    )
}

export default PolicyPage