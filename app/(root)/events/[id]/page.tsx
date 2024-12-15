import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import Image from "next/image";
import React from 'react';
import { formatDateTime } from '@/lib/utils';
import RelatedEventsContent from '@/components/RelatedEventsContent';
import CheckoutButton from '@/components/CheckoutButton';
import { Calendar, Globe, MapPin } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

const EventDetails = async({
    params,
    searchParams,
  }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) => {

    const { id } = await params;
    const searchParamsResolved = await searchParams;

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;
    
    const event = await getEventById(id);

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParamsResolved.page as string,
    });

    return (
        <>
            <section className='bg-white relative pt-10'>
                <div className='container mx-auto px-4 py-8 sm:py-12 lg:py-16'>
                    {/* Event Image */} 
                    <div className="mx-auto max-w-4xl">
                        <div className="overflow-hidden rounded-xl shadow-lg">
                            <Image
                                alt={event.title}
                                src={event.imageUrl}
                                width={1000}
                                height={500}
                                className="w-full h-[300px] sm:h-[400px] object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Event info */}
                    <div className='mx-auto max-w-4xl mt-8 lg:mt-12'>
                        <div className='grid lg:grid-cols-3 gap-8'>
                            <div className='lg:col-span-2'>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    {event.title}
                                </h1>
                                <div className="flex items-center mb-4">
                                    <span className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium'>
                                        {event.category.name}
                                    </span>
                                </div>
                                <div className="flex items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700">Hosted by:</h3>
                                    <p className="ml-2 text-gray-600">{event.organizer.firstName} {event.organizer.lastName}</p>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">About the event:</h3>
                                    <p className='text-gray-600 leading-relaxed'>{event.description}</p>
                                </div>
                                <div className="flex items-center">
                                    <Globe className="w-5 h-5 text-purple-600 mr-2" />
                                    <a href={event.url} target='_blank' rel="noopener noreferrer" className='text-purple-600 hover:text-purple-800 transition-colors'>
                                        {event.url}
                                    </a>
                                </div>
                            </div>

                            {/* Event Details: Price, Date, Location, and Join */}
                            <div className='lg:border-l lg:border-gray-200 lg:pl-8 space-y-6'>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Price</h4>
                                    <span className='inline-block bg-green-100 text-green-800 text-lg font-semibold px-3 py-1 rounded-full'>
                                        {event.isFree ? "Free" : `${event.price} TND`}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Date & Time</h4>
                                    <div className='space-y-2'>
                                        <div className='flex items-center'>
                                            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                                            <p className='text-gray-600'>
                                                Start: {formatDateTime(event.startDateTime).dateOnly} at {formatDateTime(event.startDateTime).timeOnly}
                                            </p>
                                        </div>
                                        <div className='flex items-center'>
                                            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                                            <p className='text-gray-600'>
                                                End: {formatDateTime(event.endDateTime).dateOnly} at {formatDateTime(event.endDateTime).timeOnly}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Location</h4>
                                    <div className='flex items-center'>
                                        <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                                        <p className='text-gray-600'>{event.location}</p>
                                    </div>
                                </div>
                                <CheckoutButton event={event} currentUserId={userId} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Events From The Same Category */}
            <section className='bg-gray-50 py-12 sm:py-16'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-8'>
                        You May Also Like
                    </h2>
                    <RelatedEventsContent 
                        data={relatedEvents?.data}
                        emptyTitle="No Related Events Found"
                        emptyStateText="Explore Different Events in The Home Page"
                        collectionType="All_Events"
                        limit={3}
                        page={searchParamsResolved.page as string}
                        totalPages={relatedEvents?.totalPages}
                    />
                </div>
            </section>
        </>
    );
}

export default EventDetails;

