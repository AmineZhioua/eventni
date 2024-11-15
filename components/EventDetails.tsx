/* eslint-disable */
import { Button } from './ui/button';
import React from 'react';

interface Product {
    name: string;
    price: string;
    images: {
        src: string;
        alt: string;
    }[];
    description: string;
    highlights: string[];
}

interface Reviews {
    href: string;
    average: number;
    totalCount: number;
}

const product: Product = {
    name: 'ReactJS Training for students',
    price: '500TND',
    images: [
        {
            src: '/assets/img/react-training.png',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
};

const reviews: Reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const EventDetails: React.FC = () => {
    return (
        <div className="bg-white details relative top-11">
            <div className="pt-6">
                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            alt={product.images[0].alt}
                            src={product.images[0].src}
                            className="w-full h-auto object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {product.name}
                        </h1>
                        <div className="mt-2">
                            <h3 className="text-xl font-semibold text-gray-900">Description</h3>
                            <p className='mt-4'>{product.description}</p>
                        </div>
                    </div>

                    {/* Product Details: Price, Reviews, and Add to Bag */}
                    <div className="lg:row-span-3 lg:mt-0 lg:pl-5 flex flex-col gap-4">
                        <p className=" md:mt-5 sm:mt-5">
                            <span className='text-xl font-bold tracking-tight text-gray-900'>Price :</span> {product.price}
                        </p>
                        <div className="date flex items-center mt-2">
                            <i className="fa-regular fa-calendar-days mr-2 text-xl font-bold tracking-tight text-gray-900"></i>
                            <p className='text-md'>Wed, Nov 20 - 9:00AM</p>
                        </div>
                        <div className="flex items-center mt-0">
                            <a
                                href={reviews.href}
                                className="text-lg font-medium text-indigo-600 hover:text-indigo-500">
                                {reviews.totalCount} Participants
                            </a>
                        </div>
                        <Button
                            className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <i className="fa-solid fa-plus"></i> Join Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
