import { api } from '@/trpc/react'
import React from 'react'

const ICreatorPage = () => {
  const { data : apps, isLoading} = api.app.findMany.useQuery()
  return (
    <div>
        
    </div>
  )
}

export default ICreatorPage