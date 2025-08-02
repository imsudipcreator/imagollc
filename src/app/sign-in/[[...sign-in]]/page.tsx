'use client'

import React from 'react'
import * as SignIn from '@clerk/elements/sign-in'
import * as Clerk from '@clerk/elements/common'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ImagoRing from '../../../../public/assets/auth/imago-ring.webp'
import ImagoIcon from '@/components/icons/imago-icon'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import { Icons } from '@/components/icons/icons'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'

const SignInPage = () => {
    return (
        <div className='grid w-full grow items-center px-4 sm:justify-center'>
            <SignIn.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            <SignIn.Step name='start'>
                                <Card className='w-full sm:w-96 shadow-xl'>
                                    <CardHeader>
                                        <CardTitle className='flex flex-col justify-center items-center gap-2.5 w-full '>
                                            <Image src={ImagoRing} width={150} height={150} alt='Imago Logo' />
                                            <p className='text-2xl'>Sign in with Imago</p>
                                        </CardTitle>
                                        {/* <CardDescription className='text-center'>
                                            Sign in to your imago account by filling out all the credentials.
                                        </CardDescription> */}
                                    </CardHeader>
                                    <CardContent className='grid gap-y-4'>
                                        <div className='grid grid-cols-2 gap-x-4'>
                                            <Clerk.Connection name='github' asChild>
                                                <Button
                                                    size={'sm'}
                                                    variant={'outline'}
                                                    type='button'
                                                    disabled={isGlobalLoading}
                                                >
                                                    <Clerk.Loading scope='provider:github'>
                                                        {(isLoading) => (
                                                            isLoading ? (
                                                                <LoaderIcon className='animate-spin' />
                                                            ) : (
                                                                <>
                                                                    <Icons.gitHub /> Github
                                                                </>
                                                            )
                                                        )}
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>
                                            <Clerk.Connection name='google' asChild>
                                                <Button
                                                    size={'sm'}
                                                    variant={'outline'}
                                                    type='button'
                                                    disabled={isGlobalLoading}
                                                >
                                                    <Clerk.Loading scope='provider:google'>
                                                        {(isLoading) => (
                                                            isLoading ? (
                                                                <LoaderIcon className='animate-spin' />
                                                            ) : (
                                                                <>
                                                                    <Icons.google /> Google
                                                                </>
                                                            )
                                                        )}
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>
                                        </div>
                                        <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                            or
                                        </p>
                                        <Clerk.Field name={'identifier'} className='space-y-2'>
                                            <Clerk.Label asChild>
                                                <Label>
                                                    Email
                                                </Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="email" required asChild>
                                                <Input />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className='grid w-full gap-y-4'>
                                            <SignIn.Action submit asChild>
                                                <Button disabled={isGlobalLoading}>
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <LoaderIcon className="animate-spin" />
                                                            ) : (
                                                                'Continue'
                                                            )
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignIn.Action>
                                            <Button variant="link" size="sm" asChild>
                                                <Link href="/sign-up">
                                                    Don&apos;t have an account? Sign up
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Step>



                            <SignIn.Step name='choose-strategy'>
                                <Card className="w-full sm:w-96">
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-1'>
                                            <ImagoIcon />
                                            Account
                                        </CardTitle>
                                        <CardTitle className='text-2xl font-bold'>Use another method</CardTitle>
                                        <CardDescription>Facing issues? You can use any of these methods to sign in.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <SignIn.SupportedStrategy name="email_code" asChild>
                                            <Button type="button" variant="link" disabled={isGlobalLoading}>
                                                Email code
                                            </Button>
                                        </SignIn.SupportedStrategy>
                                        <SignIn.SupportedStrategy name="password" asChild>
                                            <Button type="button" variant="link" disabled={isGlobalLoading}>
                                                Password
                                            </Button>
                                        </SignIn.SupportedStrategy>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignIn.Action navigate="previous" asChild>
                                                <Button disabled={isGlobalLoading}>
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <LoaderIcon className="animate-spin" />
                                                            ) : (
                                                                'Go back'
                                                            )
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignIn.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Step>



                            <SignIn.Step name='verifications'>
                                <SignIn.Strategy name='password'>
                                    <Card className='w-full sm:w-96'>
                                        <CardHeader>
                                            <CardTitle className='flex items-center gap-1'>
                                                <ImagoIcon />
                                                Account
                                            </CardTitle>
                                            <CardTitle className='text-2xl font-bold'>Enter your password</CardTitle>
                                            <CardDescription>Welcome back <SignIn.SafeIdentifier /></CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <Clerk.Field name="password" className="space-y-2">
                                                <Clerk.Label asChild>
                                                    <Label>Password</Label>
                                                </Clerk.Label>
                                                <Clerk.Input type="password" asChild>
                                                    <Input />
                                                </Clerk.Input>
                                                <Clerk.FieldError className="block text-sm text-destructive" />
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className='grid w-full gap-y-4'>
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <LoaderIcon className="size-4 animate-spin" />
                                                                ) : (
                                                                    'Continue'
                                                                )
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>
                                                <SignIn.Action navigate="choose-strategy" asChild>
                                                    <Button type="button" size="sm" variant="link">
                                                        Use another method
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Strategy>
                                <SignIn.Strategy name='email_code'>
                                    <Card className='w-full sm:w-96'>
                                        <CardHeader>
                                            <CardTitle className='flex items-center gap-1'>
                                                <ImagoIcon />
                                                Account
                                            </CardTitle>
                                            <CardTitle className='text-2xl font-bold'>Check your email</CardTitle>
                                            <CardDescription>Enter the verification code sent to <SignIn.SafeIdentifier /></CardDescription>
                                        </CardHeader>
                                        <CardContent className='grid gap-y-4'>
                                            <Clerk.Field name={'code'}>
                                                <Clerk.Label className="sr-only">Email verification code</Clerk.Label>
                                                <div className='className="grid gap-y-2 items-center justify-center"'>
                                                    <div className="flex justify-center text-center">
                                                        <Clerk.Input
                                                            type="otp"
                                                            autoSubmit
                                                            className="flex justify-center has-[:disabled]:opacity-50"
                                                            render={({ value, status }) => {
                                                                return (
                                                                    <div
                                                                        data-status={status}
                                                                        className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                                                    >
                                                                        {value}
                                                                    </div>
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <Clerk.FieldError className="block text-sm text-destructive text-center" />
                                                    <SignIn.Action
                                                        asChild
                                                        resend
                                                        className="text-muted-foreground"
                                                        fallback={({ resendableAfter }) => (
                                                            <Button variant="link" size="sm" disabled>
                                                                Didn&apos;t receive a code? Resend (
                                                                <span className="tabular-nums">{resendableAfter}</span>)
                                                            </Button>
                                                        )}
                                                    >
                                                        <Button variant="link" size="sm">
                                                            Didn&apos;t receive a code? Resend
                                                        </Button>
                                                    </SignIn.Action>
                                                </div>
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className='grid w-full gap-y-4'>
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <LoaderIcon className="size-4 animate-spin" />
                                                                ) : (
                                                                    'Continue'
                                                                )
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>
                                                <SignIn.Action navigate="choose-strategy" asChild>
                                                    <Button size="sm" variant="link">
                                                        Use another method
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Strategy>
                            </SignIn.Step>
                        </>
                    )}
                </Clerk.Loading>
            </SignIn.Root>
        </div>

    )
}

export default SignInPage