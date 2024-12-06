'user server'
import { IEvent } from "@/lib/database/models/event.model";
import Dropdown from "./shared/Dropdown";
import EventCard from "./EventCard";


interface ContentProps {
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
async function Content({ 
    data, 
    emptyTitle, 
    emptyStateText, 
    collectionType, 
    limit,
    page,
    totalPages = 0,
    urlParamName }: ContentProps) {

    return (
        <div className='content' id='Content'>
            <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl'>Discover<br></br> Some Events For You</h1>
            <div className="search-bar flex items-center justify-start my-10">
                <div className="search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="search-bar" placeholder="Search for an event" />
                </div>
                <div className='sort'>
                    <Dropdown />
                </div>
            </div>
            {/* Cards Section */}
            <div>
                {
                    data.length > 0 ? (
                        <ul className="cards relative mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
        </div>
    );
}

export default Content;