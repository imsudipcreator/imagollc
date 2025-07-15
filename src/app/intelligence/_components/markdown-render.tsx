import React from 'react'
import Markdown from 'react-markdown'

const MarkdownRender = ({ children }: { children: string }) => {
    return (
        <Markdown>
            {children}
        </Markdown>
    )
}

export default MarkdownRender