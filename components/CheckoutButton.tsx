'use client'
import { IEvent } from '@/lib/database/models/event.model';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from './ui/button';
import Checkout from './Checkout';
import Link from 'next/link';


const CheckoutButton = ({ event }: { event: IEvent }) => {
    const isEventFinished = new Date(event.endDateTime) < new Date();
    const { user } = useUser();
    const userId = user?.publicMetadata?.userId as string;

    return (
        <div className='flex items-center gap-3'>
            {/* Event is no longer Available */}
            {
                isEventFinished ? (
                    <Button className='cursor-not-allowed' disabled>
                        Event is no longer available
                    </Button>
            ) : (
                <>
                    <SignedOut>
                        <Button className='flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2'>
                            <Link href='/sign-in'>
                                <i className="fa-solid fa-plus"></i> Join Now
                            </Link>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <Checkout event={event} userId={userId} />
                    </SignedIn>
                </>
            )}
        </div>
    );
}





export default CheckoutButton;