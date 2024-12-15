import { IEvent } from '@/lib/database/models/event.model';
import React from 'react'
import EventCard from './EventCard';
import { Calendar, Frown } from 'lucide-react';
import Link from 'next/link';

interface RelatedEventsContentProps {
    data: IEvent[],
    emptyTitle: string,
    emptyStateText: string,
    limit: number,
    page: number | string,
    urlParamName?: string,
    totalPages?: number,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

/* eslint-disable */
const RelatedEventsContent = ({ 
    data, 
    emptyTitle, 
    emptyStateText, 
    collectionType, 
    limit,
    page,
    totalPages = 0,
    urlParamName 
}: RelatedEventsContentProps) => {

    return (
        <div className="w-full">
            {data.length > 0 ? (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map(event => {
                        const hasOrderLink = collectionType === 'Events_Organized';
                        const hidePrice = collectionType === 'My_Tickets';

                        if(!event.organizer) {
                            return null;
                        }
                        return (
                            <li key={event._id} className="col-span-1">
                                <EventCard
                                    event={event}
                                    hasOrderLink={hasOrderLink}
                                    hidePrice={hidePrice}
                                />
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <Frown className="w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{emptyTitle}</h2>
                    <p className="text-gray-600 max-w-md">{emptyStateText}</p>
                    {
                        collectionType === 'All_Events' && (
                        <div className="mt-6">
                            <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                <Calendar className="mr-2 h-4 w-4" />
                                Explore Events
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RelatedEventsContent;

