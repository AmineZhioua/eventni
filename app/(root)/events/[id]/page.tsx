import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { Button } from '@/components/ui/button';
import { SearchParamProps } from '@/types';
import Image from "next/image";
import React from 'react';
import { formatDateTime } from '@/lib/utils';
import RelatedEventsContent from '@/components/RelatedEventsContent';

const EventDetails = async({ params: { id }, searchParams }: SearchParamProps) => {

    const event = await getEventById(id);

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string,
    });

    return (
        <>
            <section className='bg-white details relative top-11'>
                <div className='pt-6'>
                    {/* Event Image */} 
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="overflow-hidden rounded-lg">
                            <Image
                                alt="main image"
                                src={event.imageUrl}
                                width={1000}
                                height={1000}
                                className="w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Event info */}
                    <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
                        <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex justify-center">
                                {event.title}
                            </h1>
                            <div className="mt-5 flex items-center">
                                <p className='bg-slate-200 px-2 py-2 rounded-md'>{event.category.name}</p>
                            </div>
                            <div className="mt-5 flex items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Hosted by :&nbsp;</h3>
                                <p>{event.organizer.firstName} {event.organizer.lastName}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-gray-900">About the event :</h3>
                                <p className='mt-2'>{event.description}</p>
                            </div>
                            <div className="mt-4 flex items-center">
                                <Image 
                                    src="/assets/icons/url.svg"
                                    alt="calendar"
                                    className='mr-1'
                                    width={24}
                                    height={24}
                                />
                                <a href={event.url} target='blank' className=''><u>{event.url}</u></a>
                            </div>
                        </div>

                        {/* Event Details: Price, Reviews, and Join */}
                        <div className='lg:row-span-3 lg:mt-0 lg:pl-5 flex flex-col gap-4'>
                            <p className=" md:mt-5 sm:mt-5">
                                <span className='text-xl font-bold tracking-tight text-gray-900'>Price :</span> 
                                <span className='bg-slate-200 ml-2 rounded-md px-2 py-1'>
                                    {event.isFree ? "Free" : `${event.price} TND`}
                                </span>
                            </p>
                            {/* Event Start Date */}
                            <div className="date mt-2">
                                <span className='text-md font-bold tracking-tight text-gray-900'>Start Date : </span> 
                                <div className='flex items-center mt-2'>
                                    <Image 
                                        src="/assets/icons/calendar.svg"
                                        alt="calendar"
                                        className='mr-2'
                                        width={24}
                                        height={24}
                                    />
                                    <p className='text-md'>
                                        {formatDateTime(event.startDateTime).dateOnly} | {formatDateTime(event.startDateTime).timeOnly}
                                    </p>
                                </div>
                            </div>
                            {/* Event End Date */}
                            <div className="date mt-2">
                                <span className='text-md font-bold tracking-tight text-gray-900'>End Date : </span> 
                                <div className='flex items-center mt-2'>
                                    <Image 
                                        src="/assets/icons/calendar.svg"
                                        alt="calendar"
                                        className='mr-2'
                                        width={24}
                                        height={24}
                                    />
                                    <p className='text-md'>
                                        {formatDateTime(event.endDateTime).dateOnly} | {formatDateTime(event.endDateTime).timeOnly}
                                    </p>
                                </div>
                            </div>
                            <div className="date flex flex-col mt-2">
                                <span className='text-md font-bold tracking-tight text-gray-900'>Location : </span> 
                                <div className='flex items-center mt-2'>
                                    <Image 
                                        src="/assets/icons/location.svg"
                                        alt="location"
                                        className='mr-2'
                                        width={24}
                                        height={24}
                                    />
                                    <p className='text-md'>{event.location}</p>
                                </div>
                            </div>

                            <Button
                                className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2"
                            >
                                <i className="fa-solid fa-plus"></i> Join Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Similar Events From The Same Category */}
            <section className='wrapper  my-14 mx-5 flex flex-col gap-8 md:gap-12'>
                <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                    <u>You May Also Like :</u>
                </h1>
                <RelatedEventsContent 
                    data={relatedEvents?.data}
                    emptyTitle="No Events Found"
                    emptyStateText="Come Back Later"
                    collectionType="All_Events"
                    limit={6}
                    page={1}
                    totalPages={2}
                />
            </section>
        </>
    );
}

export default EventDetails;