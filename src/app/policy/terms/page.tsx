import ImagoSymbol from '@/components/icons/imago-symbol';
import Link from 'next/link';
import React from 'react'
import ReactMarkdown from "react-markdown"

const termsContent = [
    {
        title: "Ownership of Site; Agreement to Terms of Use",
        content: "These Terms and Conditions of Use (\"Terms of Use\") apply to the Imago web platform located at imagollc.vercel.app, including all related apps, services, subdomains, affiliated developer tools, and service endpoints operated by Imago LLC (\"Imago\"). These platforms and services are collectively referred to as the \"Site\" or \"Platform\".\n\nThe Site is the property of Imago LLC. BY ACCESSING OR USING ANY PART OF THE SITE, YOU AGREE TO THESE TERMS OF USE. IF YOU DO NOT AGREE, DO NOT ACCESS OR USE ANY SERVICE OPERATED BY IMAGO.\n\nImago reserves the right, at its sole discretion, to update, revise, modify, or remove portions of these Terms of Use at any time. You are responsible for checking these Terms of Use periodically for changes. Continued use of the Site or Services following changes will constitute your agreement to the revised terms.\n\nSubject to your compliance with these Terms of Use, Imago grants you a limited, non-transferable, revocable, and non-exclusive license to access and use the Site and Services for your personal or authorized business use."
    },
    {
        title: "Content",
        content: "All user interfaces, source code, AI-generated content, datasets, visual elements, platform logic, structure, user-submitted data, designs, and written materials (\"Content\") across Imago's services are either owned by or licensed to Imago LLC.\n\nThis includes but is not limited to: designs, trademarks, UI layouts, language models, generated AI output, code snippets, documents, logos, product structures, and feedback or interaction logs.\n\nThe structure, selection, coordination, expression, and \"look and feel\" of all Content is protected by trade dress, copyright, and other intellectual property laws.\n\nYou may not copy, reuse, republish, upload, post, publicly display, encode, translate, transmit, or distribute any part of the Content in any form without prior written consent from Imago LLC."
    },
    {
        title: "User Conduct",
        content: "You agree to use the Imago Platform only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the Site. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue.\n\nYou also agree not to attempt to gain unauthorized access to the Site or any of its services, accounts, computer systems, or networks through hacking, password mining, or any other means."
    },
    {
        title: "Third-Party Services and Links",
        content: "Imago’s services may contain links to or integrations with third-party websites, APIs, tools, or services that are not owned or controlled by Imago LLC.\n\nWe are not responsible for the content, privacy policies, or practices of any third-party websites or services. Use of such third-party services is subject to their own terms and policies.\n\nWe do not endorse or assume any responsibility for these third-party offerings, and any interactions with them are done at your own risk."
    },
    {
        title: "Service Availability and Modifications",
        content: "Imago reserves the right to modify, suspend, or discontinue any part of the Platform or its Services at any time without prior notice.\n\nWe do not guarantee that the Platform will be available at all times or without interruption. Service downtime may occur due to maintenance, updates, system outages, or reasons beyond our control."
    },
    {
        title: "Termination of Use",
        content: "Imago reserves the right to terminate or suspend your access to the Platform or Services at its sole discretion, without notice or liability, for conduct that violates these Terms of Use or is harmful to other users, Imago’s business, or third parties.\n\nYou may also terminate your use at any time by ceasing all access to the Platform.\n\nUpon termination, your right to use the Platform will immediately cease and any data or access linked to your account may be removed."
    },
    {
        title: "Disclaimer of Warranties",
        content: "The Imago Platform and all related services are provided on an \"AS IS\" and \"AS AVAILABLE\" basis. Imago makes no warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.\n\nWe do not warrant that the services will be uninterrupted, secure, or error-free, or that any data will be accurate or preserved in the event of service disruption."
    },
    {
        title: "Limitation of Liability",
        content: "To the fullest extent permitted by applicable law, Imago LLC shall not be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, revenue, data, or use, incurred by you or any third party.\n\nYour sole and exclusive remedy for dissatisfaction with the Platform is to stop using the services."
    },
    {
        title: "Governing Law and Jurisdiction",
        content: "These Terms of Use are governed by and construed in accordance with the laws of India. You agree that any legal proceedings arising from or related to the use of the Imago Platform shall be brought exclusively in the courts located in West Bengal, India.\n\nYou waive any objection to venue or jurisdiction in such courts."
    },
    {
        title: "Contact and Support",
        content: "If you have any questions about these Terms of Use or require support for any of our services, you may contact us at support@imagollc.in. We aim to respond to inquiries within a reasonable time frame."
    }
];



function TermsPage() {
    return (
        <main className='w-full flex flex-col items-center justify-start gap-12 mb-32 py-16'>
            <section className='lg:max-w-[800px] w-[88%] flex flex-col lg:items-center items-baseline justify-center lg:text-center text-left gap-3 py-12 border-b border-border'>
                <h1 className='lg:text-5xl text-4xl font-bold'>Imago Terms and Conditions</h1>
                <p className='lg:text-xl text-lg'>Legal Information & Notices</p>
            </section>

            <section className='lg:max-w-[800px] w-[88%] flex flex-col items-center justify-center gap-8'>
                {
                    termsContent.map((item) => (
                        <div className='flex flex-col gap-2 text-left items-baseline lg:text-lg' key={item.title}>
                            <h1 className='font-semibold text-2xl'>{item.title}</h1>
                            <ReactMarkdown>
                                {item.content}
                            </ReactMarkdown>
                        </div>
                    ))
                }


            </section>

            <section className='w-full flex items-center justify-center'>

                <div className='lg:w-[800px] w-[88%] rounded-lg lg:p-9 p-5 bg-muted flex flex-col gap-2'>
                    <label className='font-semibold text-muted-foreground mb-2'>Suggested Routes</label>
                    <div className='flex items-center gap-1.5 text-theme group'>
                        <ImagoSymbol name='doc_text' className='' />
                        <Link href={'/policy/submission'} className='group-hover:underline'>Read Our Submission Guidelines</Link>
                    </div>
                    <div className='flex items-center gap-1.5 text-theme group'>
                        <ImagoSymbol name='doc_text' className='' />
                        <Link href={'/policy/developer'} className='group-hover:underline'>Learn about Our Developer Agreement</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default TermsPage