/* eslint-disable */
'use client'
import React, { ReactNode } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import Dropdown from './shared/Dropdown';
import { IEvent } from '@/lib/database/models/event.model';
import EventCard from './EventCard';

interface ContentProps {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_organized' | 'My_Tickets' | 'All_Events'
}

const Content = ({ 
    data, 
    emptyTitle, 
    emptyStateSubtext, 
    collectionType, 
    limit, 
    page, 
    totalPages = 0,
    urlParamName }: ContentProps) => {
    return (
        <div className='content' id='Content'>
            <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                Discover<br /> Some Events For You
            </h1>
            <div className="search-bar flex items-center justify-start my-10">
                <div className="search">
                    <Image 
                        src="/assets/icons/search.svg"
                        alt="search"
                        className='mr-1 absolute left-4'
                        width={24}
                        height={24}
                    />
                    <input type="text" name="search-bar" placeholder="Search for an event" />
                </div>
                <div className='sort'>
                    <Dropdown />
                </div>
            </div>
            {/* Cards Section */}
            <>
                {
                    data.length > 0 ? (
                        <ul className="cards mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {data.map((event) => {
                                const hasOrderLink = collectionType === 'Events_organized';
                                const hidePrice = collectionType === 'My_Tickets';
                                return (
                                    <li key={event._id}>
                                        <EventCard event={event} hasOrderink={hasOrderLink} hidePrice={hidePrice} />
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <div className='flex justify-center items-center flex-col'>
                            <h3 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl'>{emptyTitle}</h3>
                            <p className='text-balance font-medium tracking-tight text-gray-900 sm:text-lg'>{emptyStateSubtext}</p>
                        </div>
                    )
                }
            </>
        </div>
    );
};

export default Content;
