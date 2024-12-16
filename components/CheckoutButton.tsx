'use client'
import { IEvent } from '@/lib/database/models/event.model';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from './ui/button';
import Checkout from './Checkout';
import Link from 'next/link';



/* eslint-disable */
const CheckoutButton = ({ event, currentUserId }: { event: IEvent, currentUserId: string }) => {

    const isEventFinished = new Date(event.endDateTime) < new Date();
    const { user } = useUser();
    const userId = user?.publicMetadata?.userId as string;

    const isEventOwner = currentUserId === event.organizer._id;

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
                        <Button className="bg-purple-600 hover:bg-purple-700 w-full text-white font-semibold py-2 px-6 rounded-sm transition duration-300 ease-in-out transform hover:scale-105">
                            <Link href='/sign-in'>
                                <i className="fa-solid fa-plus"></i> Join Now
                            </Link>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        {
                            isEventOwner ? (
                                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-sm transition duration-300 ease-in-out transform hover:scale-105">
                                    <Link href={`/events/${event._id}/update`}>
                                        Need to make changes?
                                    </Link>
                                </Button>
                                ) : (
                                    <Checkout event={event} userId={userId} />
                            )
                        }
                        
                    </SignedIn>
                </>
            )}
        </div>
    );
}





export default CheckoutButton;