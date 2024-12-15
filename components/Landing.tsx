import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Landing: React.FC = () => {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-300 to-blue-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Host, Connect, Celebrate!
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-600 sm:text-xl/8">
                        Create & host your events on our platform for free!
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            <Link href={'#Content'}>
                                Find Events
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            />
        </div>
    );
};

export default Landing;
