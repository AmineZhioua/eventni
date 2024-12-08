import { IEvent } from '@/lib/database/models/event.model';
import React from 'react'
import EventCard from './EventCard';

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
    urlParamName }: RelatedEventsContentProps) => {

    return (
        <div>
            {
                data.length > 0 ? (
                    <ul className="cards relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            data.map(event => {
                                const hasOrderLink = collectionType === 'Events_Organized';
                                const hidePrice = collectionType === 'My_Tickets';

                                return (
                                    <li key={event._id}>
                                        <EventCard
                                            event={event}
                                            hasOrderLink={hasOrderLink}
                                            hidePrice={hidePrice}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : (
                    <div className="flex py-5 justify-center items-center flex-col">
                        <h1 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl">{emptyTitle}</h1>
                        <h3 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-xl">{emptyStateText}</h3>
                    </div>
                )
            }
        </div>
    );
}




export default RelatedEventsContent;