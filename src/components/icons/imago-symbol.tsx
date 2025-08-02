import { cn } from '@/lib/utils'
import React from 'react'

interface ImagoSymbolProps {
    name : string,
    fontSize? : string
    className? : string
    styles? : React.CSSProperties
}

function ImagoSymbol({name, fontSize = '16px', className, styles} : ImagoSymbolProps) {
  return (
     <i style={{ fontSize, ...styles, display : 'flex', justifyContent : "center", alignItems : 'center' }} className={cn('f7-icons', className)}>{name}</i>
  )
}

export default ImagoSymbol