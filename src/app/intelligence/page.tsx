import React from 'react'


export const dummyMessages = [
  {
    id: "msg_001",
    chatId: "chat_abc123",
    userId: "user_18ee8",
    role: "user",
    content: "Hey IMI, can you explain recursion in simple terms?",
    type: "prompt",
    model: "imi1",
    createdAt: "2025-07-14 15:00:00",
    updatedAt: "2025-07-14 15:00:00",
  },
  {
    id: "msg_002",
    chatId: "chat_abc123",
    userId: "user_18ee8",
    role: "assistant",
    content:
      "Sure! Recursion is when a function calls itself to solve a smaller version of a problem, until it reaches a base case.",
    type: "result",
    model: "imi1",
    createdAt: "2025-07-14 15:00:01",
    updatedAt: "2025-07-14 15:00:01",
  },
  {
    id: "msg_003",
    chatId: "chat_abc123",
    userId: "user_18ee8",
    role: "user",
    content: "Can you show a code example in JavaScript?",
    type: "prompt",
    model: "imi1",
    createdAt: "2025-07-14 15:01:30",
    updatedAt: "2025-07-14 15:01:30",
  },
  {
    id: "msg_004",
    chatId: "chat_abc123",
    userId: "user_18ee8",
    role: "assistant",
    content: `Sure! Here's a simple recursive function:

\`\`\`js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
\`\`\`
`,
    type: "result",
    model: "imi1c",
    createdAt: "2025-07-14 15:01:32",
    updatedAt: "2025-07-14 15:01:32",
  },
];



const IntelligencePage = () => {
  return (
    <div className='flex-1  flex items-center justify-center'>
      <div className='max-w-3xl w-full h-full flex flex-col items-center justify-center '>
        <h1 className='sm:text-2xl text-xl font-semibold px-8 text-center'>Hi, How can i help you today?</h1>
      </div>
    </div>
  )
}

export default IntelligencePage