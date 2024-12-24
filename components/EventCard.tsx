import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Delete from './Delete';
import { Calendar, MapPin, User } from 'lucide-react';

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
                className='relative flex-center flex-grow bg-gray-200 bg-cover bg-center text-grey-500 overflow-hidden'
            >
                <Image 
                    src={event.imageUrl} 
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </Link>
            
            {isEventCreator && !hidePrice && (
                <div className='absolute flex right-2 top-2 flex-col gap-4 rounded-xl bg-white items-center p-2 shadow-sm transition-all'>
                    <Link href={`/events/${event._id}/update`} className="hover:text-purple-600 pt-1 transition-colors">
                        <Image src={"/assets/icons/edit.svg"} alt='edit' width={20} height={20} />
                    </Link>
                    <Delete eventId={event._id} />
                </div>
            )}
            
            <div className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>
                {!hidePrice && (
                    <div className='flex gap-2'>
                        <span className='p-semibold-14 w-min rounded-full bg-purple-600 text-white px-4 py-1'>
                            {event.isFree ? 'Free' : `${event.price}TND`}
                        </span>
                        <p className='p-semibold-14 w-min line-clamp-1 rounded-full bg-gray-500/10 px-4 py-1 text-gray-500'>
                            {event.category.name}
                        </p>
                    </div>
                )}
                
                <Link href={`/events/${event._id}`} className="group">
                    <h3 className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-balance font-semibold tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors'>
                        {event.title}
                    </h3>
                </Link>
                
                <div className='flex items-center text-gray-500'>
                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                    <p className='p-medium-14 md:p-medium-16'>
                        {formatDateTime(event.startDateTime).dateTime}
                    </p>
                </div>
                
                <div className='flex items-center text-gray-500'>
                    <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                    <p className='p-medium-14 md:p-medium-16 line-clamp-1'>
                        {event.location}
                    </p>
                </div>
                
                <div className='flex justify-between w-full pt-4 border-t'>
                    <div className='flex items-center'>
                        <User className="w-5 h-5 mr-2 text-purple-600" />
                        <p className='p-medium-14 md:p-medium-16 text-gray-600'>
                            {event.organizer.firstName} {event.organizer.lastName}
                        </p>
                    </div>
                    {hasOrderLink && (
                        <Link href={`/events/orders?eventId=${event._id}`} className='flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors'>
                            <span className='text-sm font-medium'>Order List</span>
                            <Image src="/assets/icons/north_arrow.svg" alt='' width={12} height={12} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;

