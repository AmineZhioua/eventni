import RelatedEventsContent from '@/components/RelatedEventsContent';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/orders.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'
import { Calendar, Plus } from 'lucide-react';

const ProfilePage = async({
    searchParams  
    } :
    {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    // Pagination Params
    const resolvedSearchParams = await searchParams;
    const ordersPage = Number(resolvedSearchParams?.ordersPage) || 1;
    const eventsPage = Number(resolvedSearchParams?.eventsPage) || 1;

    const orders = await getOrdersByUser({
        userId,
        page: ordersPage
    });

    const orderedEvents = await orders?.data.map((order: IOrder) => order.event || []);
    
    const organizedEvents = await getEventsByUser({ 
        userId, 
        page: eventsPage
    });
    
    return (
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen">
            <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
                {/* Events Joined Section */}
                <section className='mb-12 sm:mb-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                            Events You Joined
                        </h2>
                        <Button asChild className='hidden sm:flex bg-purple-600 hover:bg-purple-700'>
                            <Link href={'/'}>
                                <Calendar className="mr-2 h-4 w-4" /> Explore more events
                            </Link>
                        </Button>
                    </div>
                    <RelatedEventsContent
                        data={orderedEvents}
                        collectionType='My_Tickets'
                        emptyTitle='No Tickets'
                        emptyStateText='You can explore more events and get your tickets!'
                        limit={3}
                        urlParamName='ordersPage'
                        page={ordersPage}
                        totalPages={orders?.totalPages}
                    />
                </section>

                {/* Events Organized Section */}
                <section className='mt-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>Events You Created</h2>
                        <Button asChild size="lg" className='hidden sm:flex bg-purple-600 hover:bg-purple-700'>
                            <Link href={'/events/create'}>
                                <Plus className="mr-2 h-4 w-4" /> Create an Event
                            </Link>
                        </Button>
                    </div>
                    <RelatedEventsContent
                        data={organizedEvents?.data}
                        collectionType='Events_Organized'
                        emptyTitle='No Events Created'
                        emptyStateText='Create some events and share them with the world!'
                        limit={6}
                        urlParamName='eventsPage'
                        page={eventsPage}
                        totalPages={organizedEvents?.totalPages}
                    />
                </section>
            </div>
        </div>
    );
}

export default ProfilePage;

