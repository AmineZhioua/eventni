import RelatedEventsContent from '@/components/RelatedEventsContent';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { auth } from '@clerk/nextjs/server';
import { Link } from 'lucide-react';
import React from 'react'



const ProfilePage = async() => {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({ 
        userId, 
        page: 1 });   
    
    return (
        <div className="relative isolate px-6 pt-1 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto py-24 sm:py-24 lg:py-24">
                    {/* My Tickets Section */}
                    <section className='wrapper flex items-center justify-center sm:justify-between'>
                        <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-xl sm:text-center'>My Tickets</h1>
                        <Button asChild size="lg" className='hidden sm:flex'>
                            <Link href='/#events'>
                                Explore more events
                            </Link>
                        </Button>
                    </section>
                    {/* <section className='wrapper flex items-center justify-center sm:justify-between'>
                        <RelatedEventsContent
                            data={organizedEvents?.data}
                            collectionType='My_Tickets'
                            emptyTitle='No Tickets'
                            emptyStateText='You can explore more events and get your tickets!'
                            limit={3}
                            urlParamName='ordersPage'
                            page={1}
                            totalPages={2}
                        />
                    </section> */}

                    {/* Events Organized Section */}
                    <section className='wrapper my-5 flex items-center justify-center sm:justify-between'>
                        <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-xl'>Events Organized</h1>
                        <Button asChild size="lg" className='hidden sm:flex'>
                            <Link href='/events/create'>
                                Explore more events
                            </Link>
                        </Button>
                    </section>
                    <section className='wrapper flex items-center justify-center sm:justify-between'>
                        <RelatedEventsContent
                            data={organizedEvents?.data}
                            collectionType='Events_Organized'
                            emptyTitle='No Events Created'
                            emptyStateText='Create some events and share them with the world!'
                            limit={6}
                            urlParamName='eventsPage'
                            page={1}
                            totalPages={2}
                        />
                    </section>
                </div>
        </div>
    );
}



export default ProfilePage;