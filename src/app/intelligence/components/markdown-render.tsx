/* eslint-disable @next/next/no-img-element */
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowDownToLine, CloudUpload } from 'lucide-react';
import React from 'react'
import Markdown from 'react-markdown'
import type { ComponentProps } from 'react'
import rehypeHighlight from "rehype-highlight"
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MarkdownRender = ({ children }: { children: string }) => {
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
                                <ContextMenuItem>
                                    <CloudUpload />
                                    Upload to community
                                </ContextMenuItem>
                                <ContextMenuItem>
                                    <ArrowDownToLine />
                                    Download image
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    </Dialog>

                ),
                code({ inline, className, children, ...props }: ComponentProps<'code'> & { inline?: boolean }) {
                    // const match = /language-(\w+)/.exec(className || "");
                    return !inline ? (
                        <pre className="bg-secondary text-secondary-foreground  rounded-lg p-4 text-wrap overflow-x-auto text-sm my-4">
                            <code className={className} {...props}>
                                {children}
                            </code>
                        </pre>
                    ) : (
                        <code className="bg-zinc-800 text-red-600 px-1 rounded">
                            {children}
                        </code>
                    );
                },
            }}
        >
            {children}
        </Markdown>
    )
}

export default MarkdownRender