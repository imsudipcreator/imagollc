'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import DataPrivacy from '../../../../public/assets/legal/data-privacy.webp'
import ReactMarkdown from "react-markdown"
import { cn } from '@/lib/utils'
import ImagoSymbol from '@/components/icons/imago-symbol'

const privacyAccordionData = [
    {
        id: 1,
        title: "Overview",
        desc: "At Imago, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, transfer, and store your personal data across our products and services, including but not limited to Imago Intelligence, iEditor, and our application and web platforms."
    },
    {
        id: 2,
        title: "What is Personal Data?",
        desc: "“Personal Data” refers to information that can be used to identify you, either directly or indirectly. This may include:\n\n- **Identifiers** such as your name, email address, or user ID  \n- **Device information** such as IP address, browser type, and system configuration  \n- **Usage data** including feature interactions and preferences  \n- **Location data**, when permitted  \n- **Content data**, such as user-submitted feedback, code, media, or documents\n\nData that is anonymized or aggregated in a manner that it cannot reasonably be used to identify you is not considered personal data under this policy."
    },
    {
        id: 3,
        title: "Information We Collect",
        desc: "Depending on your interactions with Imago, we may collect the following categories of data:\n\n- **Account Details**: name, email, authentication tokens  \n- **Platform Usage**: session durations, UI interactions, performance logs  \n- **Submitted Content**: files, prompts, app submissions, or messages  \n- **Technical Metadata**: IP address, device ID, operating system, browser version  \n- **AI Interactions**: prompts and generated responses used with Imago Intelligence  \n- **Communication Logs**: user support requests, feedback, bug reports\n\nWe collect only what is necessary to provide, secure, and enhance your experience."
    },
    {
        id: 4,
        title: "Use of Personal Data",
        desc: "Your personal data is used for the following legitimate purposes:\n\n- To deliver, personalize, and maintain the functionality of our products and services  \n- To process payments, transactions, or fulfill orders  \n- To improve our systems and user experience through analytics  \n- To communicate policy updates, service changes, or security alerts  \n- To prevent abuse, fraud, and ensure platform integrity  \n- To comply with legal obligations and regulatory requirements"
    },
    {
        id: 5,
        title: "Disclosure of Personal Data",
        desc: "We may disclose personal data to:\n\n- **Authorized service providers** assisting in hosting, analytics, infrastructure, and support  \n- **Legal authorities**, when required to comply with law or enforce rights  \n- **Affiliated developers**, when explicit user consent is provided  \n- **Business successors**, in the event of a merger, acquisition, or sale of assets\n\nWe do not sell your personal data under any circumstances."
    },
    {
        id: 6,
        title: "International Data Transfers",
        desc: "Imago operates globally. As such, your personal data may be processed or stored in countries outside your jurisdiction. All data transfers are carried out in accordance with applicable data protection regulations and are protected using:\n\n- Standard contractual clauses (SCCs) where required  \n- Encryption and secure data routing  \n- Strict vendor vetting and confidentiality agreements\n\nOur objective is to maintain the same level of protection regardless of where your data resides."
    },
    {
        id: 7,
        title: "Data Retention",
        desc: "We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, including:\n\n- Maintaining your account and delivering services  \n- Meeting legal and regulatory requirements  \n- Ensuring operational continuity and analytics\n\nWhen data is no longer needed, we securely delete or anonymize it in accordance with industry standards."
    },
    {
        id: 8,
        title: "Your Rights",
        desc: "Depending on your jurisdiction, you may have the right to:\n\n- Access, correct, or delete your personal data  \n- Restrict or object to certain types of processing  \n- Withdraw consent where applicable  \n- Lodge a complaint with a relevant data protection authority\n\nTo exercise your rights, please contact us at **support@imagollc.in**."
    },
    {
        id: 9,
        title: "Data Security",
        desc: "We implement technical and organizational measures to safeguard your personal data, including:\n\n- HTTPS encryption and secure access control  \n- Firewall and anti-malware protections  \n- Role-based access and logging for auditability  \n- Data minimization and principle of least privilege\n\nDespite our efforts, no system is entirely immune to threats. We encourage users to use strong passwords and remain vigilant."
    },
    {
        id: 10,
        title: "Children’s Privacy",
        desc: "Imago does not knowingly collect data from individuals under the age of 13 (or applicable age as defined by local laws). If we discover that we have inadvertently collected personal data from a child, we will promptly delete such information from our systems."
    },
    {
        id: 11,
        title: "Cookies and Similar Technologies",
        desc: "We use cookies and similar technologies to:\n\n- Enable core functionality and user preferences  \n- Provide performance insights and analytics  \n- Detect and prevent malicious behavior\n\nYou can manage your cookie preferences through your browser settings. Disabling cookies may affect the performance or availability of some features."
    },
    {
        id: 12,
        title: "Changes to This Policy",
        desc: "We may periodically update this Privacy Policy to reflect legal, technological, or operational changes. Any material changes will be communicated through our services or via email. The revised policy will include a **\"Last Updated\"** date."
    }
];



function PrivacyPage() {
    const [openedAccordion, setOpenedAccordion] = useState<number[]>([])
    function toggleAccordion(id: number) {
        if (openedAccordion.includes(id)) {
            const filterRemoved = openedAccordion.filter((item) => item !== id)
            setOpenedAccordion(filterRemoved)
        } else {
            setOpenedAccordion((prev) => [...prev, id])
        }
    }

    return (
        <main className='flex flex-col w-full items-center justify-start gap-24 py-11 mb-28'>
            <section className='lg:max-w-[61rem] w-[88%] flex flex-col lg:items-center items-baseline justify-center gap-5 lg:text-center text-left'>
                <h1 className='font-semibold lg:text-5xl text-3xl'>Imago Privacy Policy</h1>
                <h2 className='font-semibold text-xl'>Updated June 30, 2025</h2>
                <h4 className='lg:w-[66%] w-[88%] text-xl'>
                    Imago’s Privacy Policy explains how we collect, use, and protect your personal information across all our services, apps, and tools.

                    In addition to this Privacy Policy, Imago provides contextual data and privacy information within specific features — especially those that request or process your personal data. You’ll see a clear indicator when data usage is involved, often marked by a privacy icon or note.
                </h4>

                <Image src={DataPrivacy} alt='data-privacy' className='size-24 self-center' />
                <h4 className='lg:w-[66%] w-[88%] text-xl'>
                    You’ll always have the opportunity to review these details before using such features. You can also revisit them at any time through settings or within the related tools — like iEditor, Imago Intelligence, or your dashboard.

                    Familiarize yourself with our practices using the sections below, and contact us if you have any questions or concerns.
                </h4>
            </section>


            <section className='lg:max-w-[980px] w-[88%] flex flex-col items-center justify-center'>
                {
                    privacyAccordionData.map((data) => (
                        <div key={data.id} className={cn('flex flex-col gap-5 items-center justify-start border-border border-b w-full py-3 pt-6',
                            data.id === 1 && 'border-t', data.id === privacyAccordionData.length && 'border-b-0'
                        )}>
                            <div onClick={() => toggleAccordion(data.id)} className='flex items-center justify-between w-full group cursor-pointer'>
                                <h1 className='lg:text-3xl text-2xl font-semibold group-hover:text-primary'>{data.title}</h1>
                                <ImagoSymbol name='plus' className={cn('group-hover:text-primary transition-all duration-300',
                                    openedAccordion.includes(data.id) && '-rotate-45'
                                )} fontSize='28px' styles={{ fontWeight: 'bolder' }} />
                            </div>


                            <div className={cn('w-full overflow-clip transition-all duration-300', openedAccordion.includes(data.id) ? 'max-h-96 ' : 'max-h-0')}>
                                <ReactMarkdown>
                                    {data.desc}
                                </ReactMarkdown>
                            </div>


                            {/* <p className='w-full leading-relaxed [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:text-lg [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:ml-5'>
                
              </p> */}
                        </div>
                    ))
                }
            </section>
        </main>
    )
}

export default PrivacyPage