/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import ImagoHero from '../../public/assets/home/imago-hero.png'
import ImagoHeroSm from '../../public/assets/home/imago-hero-sm.png'
import DeviceDesktopMockupSm from '../../public/assets/home/device-desktop-mockup-sm.webp'
import DeviceDesktopMockup from '../../public/assets/home/device-desktop-mockup.webp'
import AppsFloat from '../../public/assets/home/apps-float.webp'
import WebDesignTools from '../../public/assets/home/web-design-tools.webp'
import AiModels from '../../public/assets/home/ai-models.webp'
import ImagoOneGradient from '../../public/assets/home/imago-one-gradient.webp'
import ICreator from '../../public/assets/home/icreator.webp'
import ImagoIcon from '../../public/imago-icon.svg'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { KingFrog, Mascot, NeonTokyo, PurpleBeetle, SilverSurfer, VintageBeetle } from '../../public/assets/home/carousel'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import ImagoSymbol from '@/components/icons/imago-symbol'


const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center text-body gap-2 md:text-[14px] font-normal whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        imago: "rounded-full hover:bg-[#007AFF] bg-[#0077ed] text-white",
        imagoOutline: "rounded-full bg-transparent text-[#007AFF] ring ring-[#007AFF] hover:bg-[#007AFF] hover:text-white",
      },
      size: {
        default: "md:h-9 h-9 md:px-4 px-4 py-1 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const IntelligencePage = () => {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center justify-start gap-4">
      {/* <section className="w-full h-56 absolute top-12 bg-white/60 backdrop-blur-3xl">

      </section> */}
      <section
        className="w-full sm:flex hidden flex-col items-center justify-center min-h-svh gap-3 relative bg-[#240043]"
        style={{
          backgroundImage: `url(${(ImagoHero).src})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TextEffect preset='fade-in-blur' speedReveal={1.1} speedSegment={0.3} className='absolute bottom-1/6 md:bottom-1/12 text-white  text-lg text-center md:w-[80%] w-[88%]'>
          Welcome to imago llc. Here we craft intelligent digital solutions — Apps, Websites & AI That Work
          for You.
        </TextEffect>
      </section>
      <section
        className="w-full flex sm:hidden flex-col items-center justify-center min-h-svh gap-3 relative bg-[#240043]"
        style={{
          backgroundImage: `url(${(ImagoHeroSm).src})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TextEffect preset='fade-in-blur' speedReveal={1.1} speedSegment={0.3} className='absolute bottom-1/6 md:bottom-1/12 text-white  text-lg text-center md:w-[80%] w-[88%]'>
          Welcome to imago llc. Here we craft intelligent digital solutions — Apps, Websites & AI That Work
          for You.
        </TextEffect>
      </section>

      <section className="w-full min-h-svh flex flex-col items-center justify-start md:pt-24 gap-2 bg-[#F2F2F7] py-12">
        <p className="md:text-5xl text-3xl font-semibold">Build. Launch. Evolve.</p>
        <p className="md:text-2xl text-xl md:w-[52%] w-[80%] text-center">At Imago, we specialize in crafting powerful digital experiences that push boundaries and drive results.</p>
        <Image src={DeviceDesktopMockupSm} alt="browser-mockup" style={{ width: 900, height: 'auto' }} priority className="mt-6 md:hidden" />
        <Image id="browser-mockup" src={DeviceDesktopMockup} alt="browser-mockup" style={{ width: 900, height: 'auto' }} className="mt-6 hidden md:flex" />
        <div className="flex items-center gap-4">
          <Button variant={'imago'} className=''>
            <Link href={'/apps'}>
              Visit our work
            </Link>
          </Button>
          <Button variant={'imagoOutline'}>
            <Link href={'/contact'}>
              Get a quote
            </Link>
          </Button>
        </div>
      </section>
      <section className="w-full min-h-svh flex flex-col items-center justify-center gap-2 py-12 bg-gradient-to-b from-[#D4EAF7] via-[#E6F1F7] to-[#FDFFFE]">
        <h1 className="md:text-5xl text-3xl font-semibold">App Development</h1>
        <p className="md:text-2xl text-xl md:w-[54%] w-[80%] text-center">We build fast, secure, and scalable mobile apps tailored to your unique needs — from idea to deployment.</p>
        <Image src={AppsFloat} alt="apps-float" style={{ width: 300, height: 'auto' }} />
        <div className="flex items-center gap-4">
          <Button variant={'imago'}>
            <Link href={'/apps'}>
              Visit iStore
            </Link>
          </Button>
          <Button variant={'imagoOutline'}>
            <Link href={'/contact'}>
              Build your app
            </Link>
          </Button>
        </div>
      </section>

      {/** Blocks Data Mapping */}
      <Blocks />

      {/**Carousel */}
      {/* <Carousel /> */}


      <section className='bg-[#f5f5f7] text-black/60 mt-10 pt-7 w-full flex items-center justify-center'>
        <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line w-[92%] md:max-w-[61rem] border-b border-border pb-8">
          ◊ Imago llc uses the SF Pro typeface to maintain a modern and accessible reading experience. SF Pro is a trademark of Apple Inc., registered in the U.S. and other countries.

          {"\n\n"}Our use of SF Pro is strictly for design and presentation purposes, with full respect for Apple&apos;s intellectual property. If you are an Apple representative or license holder and have questions or concerns about our usage, please feel free to <a href="/contact" className='underline'>contact us</a> — we are happy to discuss or make any adjustments needed.
        </p>
      </section>

    </main >
  )
}

export default IntelligencePage







const blocksData = [
  {
    id: 1,
    header: (
      <h1 className="text-3xl md:text-4xl font-semibold text-black pb-3">
        Web Development
      </h1>
    ),
    subText:
      "From sleek landing pages to full-scale platforms — we create responsive, SEO-friendly websites that impress and perform.",
    bgImage: <Image src={WebDesignTools} alt="block-bg" width={200} />,
    bgColor: "#F5F5F7",
    btnGroup: (
      <div className="flex items-center gap-4">
        <Button variant={'imago'}>
          <Link href={'/apps'}>
            Visit webStore
          </Link>
        </Button>
        <Button variant={'imagoOutline'}>
          <Link href={'/contact'}>
            Get a quote
          </Link>
        </Button>
      </div>
    ),
  },
  {
    id: 2,
    header: (
      <h1 className="text-3xl md:text-4xl font-semibold text-black pb-3">
        AI Integration
      </h1>
    ),
    subText:
      "We bring intelligence to your systems with cutting-edge AI. From smart search to chatbots — if it can think, we can build it.",
    bgImage: <Image src={AiModels} alt="block-bg" width={400} />,
    bgColor: "#F5F5F7",
    btnGroup: (
      <div className="flex flex-row gap-4">
        <Button variant={'imago'}>
          <Link href={'/intelligence'}>
            Chat with intelligence
          </Link>
        </Button>
      </div>
    ),
  },
  {
    id: 3,
    header: (
      <h1 className="text-3xl md:text-4xl font-semibold text-white pb-3">
        Imago One
      </h1>
    ),
    subText:
      "A simple, all-in-one subscription to unlock full access to the Imago ecosystem — including premium apps, tools, and AI features.",
    bgImage: <Image src={ImagoOneGradient} alt="block-bg" style={{ width: 400, height: 'auto' }} />,
    bgColor: "#000000",
    btnGroup: (
      <div className="flex flex-row gap-4">
        <Button variant={'imago'}>
          <Link href={'imago-one'}>
            Try imago one for free
          </Link>
        </Button>
      </div>
    ),
  },
  {
    id: 4,
    header: (
      <div className="flex items-center justify-center pb-3 gap-1">
        <Image src={ImagoIcon as StaticImageData} alt='imago-icon' className='size-6' />
        <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
          Creator
        </h1>
      </div>
    ),
    subText:
      "Our dedicated platform for creators to publish their apps and websites directly to the Imago ecosystem.",
    bgImage: <Image src={ICreator} alt="block-bg" width={200} />,
    bgColor: "#F5F5F7",
    btnGroup: (
      <div className="flex flex-row gap-4 pt-10">
        <Button variant={'imago'}>
          <Link href={'https://icreator.vercel.app/'}>
            Visit iCreator
          </Link>
        </Button>
        <Button variant={'imagoOutline'}>
          <Link href={'https://icreator.vercel.app/documentation/app-submit'}>
            Read Docs
          </Link>
        </Button>
      </div>
    ),
  },
];


function Blocks() {
  return (
    <section className='md:w-[98%] w-full min-h-screen flex flex-row flex-wrap items-center justify-between gap-5'>
      {
        blocksData.map((block) => (
          <div
            key={block.id}
            style={{
              backgroundColor: block.bgColor,
            }}
            className={`md:w-[49%] shrink-0 relative w-full md:h-screen max-h-[700px]  flex flex-col items-center justify-center md:pt-12 py-16 gap-2`}
          >
            {block.header}
            <p
              className={`md:text-xl text-lg text-center px-6 md:px-16 ${block.bgColor === "#000000" ? "text-white" : "text-black"
                }`}
            >
              {block.subText}
            </p>
            {block.bgImage}
            {block.btnGroup}
          </div>
        ))
      }
    </section>
  )
}


const images = [
  {
    title: 'King Frog',
    desc: 'A majestic frog wearing a crown, generated by our AI.',
    url: KingFrog
  },
  {
    title: 'Mascot',
    desc: 'A friendly and energetic character mascot made with AI.',
    url: Mascot
  },
  {
    title: 'Neon Tokyo',
    desc: 'A vibrant AI-generated cityscape inspired by neon-lit Tokyo.',
    url: NeonTokyo
  },
  {
    title: 'Purple Beetle',
    desc: 'An AI-crafted futuristic beetle in glowing purple shades.',
    url: PurpleBeetle
  },
  {
    title: 'Silver Surfer',
    desc: 'A sleek AI-designed figure riding a cosmic wave.',
    url: SilverSurfer
  },
  {
    title: 'Vintage Beetle',
    desc: 'A nostalgic AI-made render of a classic beetle car.',
    url: VintageBeetle
  }
];


function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)
  const SLIDE_WIDTH = 600;

  function showPrevImage() {
    setCurrentIndex(idx => {
      if (idx === 0) {
        return images.length - 1
      }
      return idx - 1
    })
  }

  function showNextImage() {
    setCurrentIndex(idx => {
      if (idx === images.length - 1) {
        return 0
      }

      return idx + 1
    })
  }


  // console.log(currentIndex)

  // useEffect(() => {
  //   if (!isInfiniteScroll) return
  //   const interval = setInterval(() => showNextImage(), 5000)
  //   return () => clearInterval(interval)

  // }, [isInfiniteScroll, showNextImage])

  return (
    <div className='w-full  overflow-x-hidden md:h-[calc(100vh-100px)] h-[calc(100vh-400px)] overflow-y-clip flex items-center gap-5 relative'>
      
      {
        images.map((image, index) => (
          <div key={image.title} className={cn('w-[600px] shrink-0 grow-0 h-full transition-transform duration-500',
            index !== currentIndex && 'grayscale-100'
          )}
            style={{ transform: `translateX(-${currentIndex * (SLIDE_WIDTH + 20)}px)` }}
          >
            <Image src={image.url} alt='image' width={400} height={200} className='h-full object-cover md:w-full' />
          </div>
        ))
      }

      <button onClick={showNextImage} className='h-full w-12 flex items-center justify-center absolute right-0 bg-black/20'>
        <ImagoSymbol name='chevron_right' />
      </button>
      <button onClick={showPrevImage} className='h-full w-12 flex items-center justify-center absolute left-0 bg-black/20'>
        <ImagoSymbol name='chevron_left' />
      </button>
    </div>
  )
}
