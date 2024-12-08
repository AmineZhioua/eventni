import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Delete from './Delete';

interface EventCardProps {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean,
}

async function EventCard({ event, hasOrderLink, hidePrice }: EventCardProps) {

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    const isEventCreator = userId === event.organizer._id.toString();

    return (
        <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
            <Link 
                href={`/events/${event._id}`}
                style={{backgroundImage: `url(${event.imageUrl})`}}
                className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500'
            />
            {/* Is Event Creator */}
            {
                isEventCreator && !hidePrice && (
                    <div className='absolute flex right-2 top-2 flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
                        <Link href={`/events/${event._id}/update`}>
                            <Image src={"/assets/icons/edit.svg"} alt='edit' width={20} height={20} />
                        </Link>

                        <Delete eventId={event._id} />
                    </div>
                )
            }
            <div 
                className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'
            >
                { !hidePrice && 
                    <div className='flex gap-2'>
                        <span className='p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60'>
                            {event.isFree ? 'Free' : `${event.price}TND`}
                        </span>
                        <p className='p-semibold-14 w-min rounded-full bg-gray-500/10 px-4 py-1 text-gray-500'>
                            {event.category.name}
                        </p>
                    </div>
                }
                <div className='flex items-center'>
                    <Image src="/assets/icons/calendar.svg" alt='calendar' width={22} height={22} className='mr-1' />
                    <p className='p-medium-16 p-mdeium-18 text-grey-500'>
                        {formatDateTime(event.startDateTime).dateTime}
                    </p>
                </div>
                

                <Link 
                    href={`/events/${event._id}`}
                >
                    <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-balance font-semibold tracking-tight text-gray-900 sm:text-md'>
                        {event.title}
                    </p>
                </Link>
                
                <div className='flex flex-col justify-between w-full mt-5'>
                    <div className='flex items-center'>
                        <Image src="/assets/icons/user.svg" alt='user' width={22} height={22} />
                        <p className='p-medium-14 md:p-medium-16'>
                            {event.organizer.firstName} {event.organizer.lastName}
                        </p>
                    </div>
                    { hasOrderLink && (
                        <Link href={`/orders?eventId=${event._id}`} className='flex gap-2'>
                            <p className='text-primary-500 text-gray-600'><u>Order Details</u></p>
                            <Image src="/assets/icons/north_arrow.svg" alt='' width={12} height={12} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
