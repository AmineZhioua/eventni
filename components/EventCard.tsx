/* eslint-disable */
import React from 'react';
import { Button } from './ui/button';

interface EventCardProps {
    imgName: string;
    eventTitle: string;
    location: string;
    price: string;
    onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ imgName, eventTitle, location, price, onClick }) => {
    return (
        <div className='card border rounded-md grid grid-rows-[1fr_auto_auto] cursor-pointer'>
            <div className='event-img relative'>
                <img 
                    className="h-full w-full max-h-44 object-cover object-center lg:h-full lg:w-full rounded-t-md"
                    src={`/assets/img/${imgName}`}
                    alt="Event"
                />
                <div className="pricing">
                    <p>{price}</p>
                </div>
            </div>
            <div className="info">
                {/* Title & Date */}
                <div className="text py-3 px-3 mb-5">
                    <h1 className='text-balance text-sm font-semibold tracking-tight text-gray-900 sm:text-base'>
                        {eventTitle}
                    </h1>
                    <div className="date flex items-center mt-2">
                        <i className="fa-regular fa-calendar-days mr-2"></i>
                        <p className='text-sm'>Wed, Nov 20 - 9:00AM</p>
                    </div>
                </div>
                {/* Organizer & Button */}
                <div className="organizer flex justify-between items-center py-3 px-3 border-t border-t-gray-200">
                    <div className="location flex items-center">
                        <i className="fa-solid fa-location-dot mr-2"></i>
                        <p className='text-md'>{location}</p>
                    </div>
                    <Button onClick={onClick}>
                        Join now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
