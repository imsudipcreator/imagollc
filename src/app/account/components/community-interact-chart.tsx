/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/trpc/react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
    count: {
        label: "date",
        color: "var(--chart-1)"
    }
} satisfies ChartConfig

const CommunityInteractChart = () => {
    const { data, isPending } = api.user.communityPostsByDate.useQuery()
    return (
        <Card className='lg:col-span-2 col-span-1 h-full'>
            <CardHeader>
                <CardTitle>
                    Daily Community Interactivity
                </CardTitle>
                <CardDescription>
                    Increase interactivity for exclusive features
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    isPending ? (
                        <Skeleton className='w-full h-56'/>
                    ) : (
                        <ChartContainer config={chartConfig} className='max-h-56 w-full'>
                            <BarChart
                                accessibilityLayer
                                data={data}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator='line' />}
                                />
                                <Bar
                                    dataKey="count"
                                    radius={8}
                                    fill='var(--color-theme)'
                                    fillOpacity={0.4}
                                    stroke='var(--color-theme)'
                                />
                            </BarChart>
                        </ChartContainer>
                    )
                }

            </CardContent>

        </Card>
    )
}

export default CommunityInteractChart