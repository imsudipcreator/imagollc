/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowDownToLine, ArrowUpRight, Clipboard, CloudUpload } from 'lucide-react';
import React from 'react'
import Markdown from 'react-markdown'
import type { ComponentProps } from 'react'
import rehypeHighlight from "rehype-highlight"
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/utils/copy-to-clipboard';
import { downloadImage } from '@/utils/image-downloader';
import { toast } from 'sonner';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRender = ({ children }: { children: string }) => {
    const router = useRouter()
    const uploadToCommunity = api.communityPost.uploadToCommunity.useMutation({
        onSuccess: () => {
            toast.success("Image uploaded to community", {
                action: {
                    label: "Visit",
                    onClick: () => router.push('/community')
                }
            })
        }
    })
    return (
        <Markdown
            rehypePlugins={[rehypeHighlight, rehypeSanitize]}
            remarkPlugins={[remarkGfm]}
            components={{
                img: ({ src, alt }) => (
                    <Dialog>
                        <ContextMenu>
                            <DialogTrigger asChild>
                                <ContextMenuTrigger asChild>
                                    <img
                                        src={src}
                                        alt={alt ?? "image"}
                                        className='rounded-xl max-w-72 object-cover my-1.5 cursor-pointer'
                                        onError={(e) => {
                                            e.currentTarget.src = "https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg?semt=ais_hybrid&w=740"; // fallback image
                                        }}
                                    />
                                </ContextMenuTrigger>

                            </DialogTrigger>
                            <DialogContent className="max-w-7xl md:w-full w-[90%] border-0 bg-transparent p-0">
                                <div className="relative w-full overflow-clip rounded-md bg-transparent">
                                    <img src={src} alt={alt ?? 'image'} className="h-full w-full object-contain" />
                                </div>
                            </DialogContent>
                            <ContextMenuContent>
                                <ContextMenuItem onClick={() => {
                                    if (src && typeof (src) === 'string') {
                                        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
                                        toast.promise(promise, {
                                            loading: 'Uploading...'
                                        });

                                        void uploadToCommunity.mutateAsync({
                                            imageUrl: src
                                        })
                                    } else {
                                        toast.error("Image could not be uploaded to community")
                                    }
                                }}>
                                    <CloudUpload />
                                    Upload to community
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => {
                                    if (src && typeof (src) === 'string') {
                                        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
                                        toast.promise(promise, {
                                            loading: 'Downloading...'
                                        });
                                        downloadImage(src)
                                    } else {
                                        toast.error("Image could not be downloaded")
                                    }
                                }}>
                                    <ArrowDownToLine />
                                    Download image
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </Dialog>

                ),
                code({ inline, className, children, ...props }: ComponentProps<'code'> & { inline?: boolean }) {
                    const codeRef = document.getElementById("code-block")

                    const handleCopy = async () => {
                        const code = codeRef?.textContent ?? "";
                        await copyTextToClipboard(code, "Code successfully copied to clipboard");
                    };
                    const match = /language-(\w+)/.exec(className ?? "");
                    return !inline && match ? (
                        <pre className="bg-secondary text-secondary-foreground rounded-lg p-4  text-wrap overflow-x-auto text-sm my-4 relative">
                            <code id='code-block' className={className} {...props}>
                                {children}
                            </code>
                            <Button onClick={handleCopy} variant={'outline'} size={'sm'} className='cursor-pointer rounded-full absolute top-1.5 right-1.5'>
                                Copy <Clipboard />
                            </Button>
                        </pre>
                    ) : (
                        <code className="bg-ring/30 text-secondary-foreground px-1 rounded">
                            {children}
                        </code>
                    );

                    // return !inline && match ? (
                    //     <SyntaxHighlighter
                    //         language={match[1]}
                    //         PreTag="div"
                    //         {...props}
                    //     >
                    //         {String(children).replace(/\n$/, '')}
                    //     </SyntaxHighlighter>
                    // ) : (
                    //     <code className={className} {...props}>
                    //         {children}
                    //     </code>
                    // );
                },
                a: ({ href, children }) => (
                    <Link
                        href={href ?? "/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-theme/90 group underline-offset-2 inline-flex items-center gap-0.5 hover:text-theme hover:underline font-medium transition-colors"
                    >
                        {children}
                        <ArrowUpRight className='size-4 group-hover:flex hidden'/>
                    </Link>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-3 border-zinc-400 pl-4 italic my-4 text-zinc-500">
                        {children}
                    </blockquote>
                ),
                table: ({ children }) => (
                    <div className="overflow-x-auto my-4 border border-zinc-300 rounded-lg shadow">
                        <table className="w-full text-left border-collapse table-auto">
                            {children}
                        </table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="bg-zinc-100 text-sm font-semibold p-2 border">{children}</th>
                ),
                td: ({ children }) => (
                    <td className="p-2 text-sm border">{children}</td>
                ),
                h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-medium my-2">{children}</h3>,
                h4: ({ children }) => <h4 className="text-lg font-medium my-2">{children}</h4>,
                h5: ({ children }) => <h5 className="text-base font-medium my-1">{children}</h5>,
                h6: ({ children }) => <h6 className="text-sm font-medium my-1">{children}</h6>,

                ul: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
                li: ({ children }) => <li className="my-1">{children}</li>,
                hr: () => (
                    <hr className="my-6 border-t border-gray-300 dark:border-gray-600" />
                ),
            }}
        >
            {children}
        </Markdown>
    )
}

export default MarkdownRender