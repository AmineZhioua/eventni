'use server';
import { IEvent } from "@/lib/database/models/event.model";
import EventCard from "./EventCard";
import SearchInput from "./SearchInput";
import { Suspense } from "react";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";

interface ContentProps {
    data: IEvent[];
    emptyTitle: string;
    emptyStateText: string;
    limit: number;
    page: number | string;
    urlParamName?: string;
    totalPages?: number;
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events';
}

/* eslint-disable */
async function Content({ 
    data, 
    emptyTitle, 
    emptyStateText, 
    collectionType, 
    limit,
    page,
    totalPages = 0,
    urlParamName 
}: ContentProps) {

    return (
        <div className='content bg-white rounded-lg shadow-lg p-8' id='Content'>
            <h1 className='text-balance font-bold tracking-tight text-gray-900 text-3xl sm:text-4xl mb-8'>
                Discover<br /> 
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Some Events For You
                </span>
            </h1>
            <div className="search-bar flex flex-col sm:flex-row items-center gap-4 my-10">
                <div className="search w-full sm:w-auto">
                    <Suspense fallback={<div>Loading...</div>}>
                        <SearchInput placeholder="Search Event By Title..." />
                    </Suspense>
                </div>
                <div className='sort w-full sm:w-auto'>
                    <CategoryFilter />
                </div>
            </div>
            {/* Cards Section */}
            <div>
                {data.length > 0 ? (
                    <ul className="cards relative mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {data.map(event => {
                            const hasOrderLink = collectionType === 'Events_Organized';
                            const hidePrice = collectionType === 'My_Tickets';

                            return (
                                <li key={event._id} className="transition duration-300 ease-in-out transform hover:scale-105">
                                    <EventCard
                                        event={event}
                                        hasOrderLink={hasOrderLink}
                                        hidePrice={hidePrice}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex py-12 justify-center items-center flex-col bg-gray-50 rounded-lg">
                        <h1 className="text-balance font-bold tracking-tight text-gray-900 text-3xl mb-4">
                            {emptyTitle}
                        </h1>
                        <h3 className="text-balance font-medium tracking-tight text-gray-600 text-xl">
                            {emptyStateText}
                        </h3>
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="mt-12">
                        <Pagination
                            totalPages={totalPages}
                            page={page}
                            urlParamName={urlParamName}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Content;

