import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface HintProps {
    children: React.ReactNode,
    message: string
    align?: "center" | "start" | "end"
    side?: "top" | "right" | "bottom" | "left"
}

const Hint = ({ children, message, align = "center", side = "top" }: HintProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className='max-w-96' align={align} side={side}>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default Hint