import React from 'react'

const ChatPage = async ({
    params
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    return (
        <div className='flex-1 bg-emerald-300 flex items-center justify-center'>
            <div className='max-w-3xl w-full h-full overflow-y-auto bg-amber-500 mx-1.5'>
                <div>ChatPage, {id}</div>
            </div>
        </div>
    )
}

export default ChatPage