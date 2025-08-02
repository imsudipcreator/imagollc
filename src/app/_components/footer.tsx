/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image';
import React, { useEffect, useState } from 'react'
// import ImagoIcon from '@/public/imago-icon.svg'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { navigationSections } from '@/constants/routes';
import ImagoIcon from '@/components/icons/imago-icon';


export default function Footer() {
    const pathName = usePathname()
    const [openedAccordion, setOpenedAccordion] = useState("");
    const [routes, setRoutes] = useState<{ title: string, href: string }[]>([])
    const toggleAccordion = (accordion: string) => {
        if (openedAccordion === accordion) setOpenedAccordion("");
        else setOpenedAccordion(accordion);
    };
    const upperCase = (string: string) => {
        return string[0]?.toUpperCase() + string.slice(1)
    }

    useEffect(() => {
        function generateBreadcrumbs(path: string) {
            const segments = path.split('/').filter(Boolean); // removes empty strings
            const breadcrumbs: { title: string, href: string }[] = [];

            segments.reduce((acc: any, segment: any) => {
                const href = `${acc}/${segment}`;
                breadcrumbs.push({
                    title: segment,
                    href
                });
                return href;
            }, '');

            return breadcrumbs;
        }

        const breadcrumbs = generateBreadcrumbs(pathName)
        setRoutes(breadcrumbs)
    }, [pathName])




    return (
        <footer className={cn('w-full min-h-14 flex items-center justify-center text-body bg-[#f5f5f7] text-black/60')}>
            <div className='md:max-w-[61rem] w-[92%] flex flex-col items-center justify-center pb-10 md:gap-6 gap-3 pt-3.5'>

                <div className="w-full md:pt-5 py-2 flex items-center justify-start transition-colors ">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={'/'}> <ImagoIcon className={cn('hover:text-black text-[#1d1d1f]')} /></BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className={cn('text-[#1d1d1f]')} />
                            {
                                routes.length > 0 ? routes.map((route, index) => (
                                    <div key={index} className='flex items-center gap-1.5'>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={route.href} className={cn('hover:text-black text-[#1d1d1f]')}>{upperCase(route.title)}</BreadcrumbLink>
                                        </BreadcrumbItem>

                                        <BreadcrumbSeparator className={cn(routes.length === index + 1 && 'hidden')} />
                                    </div>
                                )) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/`} className={cn('hover:text-black text-[#1d1d1f]')}>{'Home'}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                )
                            }



                        </BreadcrumbList>
                    </Breadcrumb>
                </div>


                {/** Desktop footer */}
                <div className={cn("lg:block hidden w-full h-full pt-5 columns-3 text-sm space-y-6 border-t border-border-dark")}
                >
                    {navigationSections.map(section => (
                        <section className='break-inside-avoid' key={section.label}>
                            <h2 className={cn('font-semibold mb-2 text-black/90',)}>{section.label}</h2>
                            <ul className='flex flex-col gap-1.5 '>
                                {section.routes.map(route => (
                                    <li className={cn('hover:underline decoration-[0.75px] text-black/70')} key={route.href}>
                                        <Link href={route.href}>{route.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {/** Device footer */}
                <div className="lg:hidden flex flex-col w-full h-full gap-1">
                    {
                        navigationSections.map(section => (
                            <div className={cn(
                                'border-b  flex flex-col justify-center gap-2',
                                section.label === 'Explore Imago' && 'border-t pt-1.5',


                            )}
                                key={section.label}>
                                <div
                                    onClick={() => toggleAccordion(section.label)}
                                    className="flex items-center justify-between py-1"
                                >
                                    <h1 className="text-sm text-black/90">{section.label}</h1>
                                    <i
                                        className={`${openedAccordion === section.label && "rotate-180"
                                            } transition-all duration-500 f7-icons`} style={{ fontSize: '14px' }}>
                                        chevron_down
                                    </i>
                                </div>
                                <div
                                    className={`text-sm flex flex-col text-black/70 gap-2 transition-all duration-500 px-3 overflow-clip ${openedAccordion === section.label
                                        ? "py-2 max-h-48"
                                        : "py-0 max-h-0"
                                        } `}
                                >
                                    {section.routes.map((route) => (
                                        <Link
                                            href={route.href}
                                            className={cn("hover:underline")}
                                            key={route.label}
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>


                <div className={cn('w-full flex flex-col pt-7  text-xs md:text-sm')}>
                    <p className={cn('border-b  pb-2.5')}>Copyright © 2025 Imago llc. All rights reserved.</p>
                    <div className='w-full flex items-center justify-between pt-3.5'>
                        <div className={cn('flex items-center gap-2 ')}>
                            {
                                [
                                    { href: '/policy/privacy', label: 'Privacy Policy' },
                                    { href: '/policy/terms', label: 'Terms of Service' },
                                    { href: '/sitemap', label: 'Sitemap', noBorder: true },

                                ].map((link, idx) => (
                                    <Link
                                        href={link.href}
                                        key={idx}
                                        className={cn(
                                            'hover:underline decoration-[0.75px] h-3.5 flex items-center text-black/70 ',
                                            !link.noBorder && 'border-r pr-1.5 border-black/60 ',

                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))
                            }
                        </div>

                        <p>India</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}