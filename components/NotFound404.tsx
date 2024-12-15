import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        404
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Oops! Looks like you`ve wandered off the map.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Sorry, we couldn`t find the page you`re looking for. It might have been moved or doesn`t exist.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            <Home className="mr-2 h-5 w-5" />
                            Go back home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default NotFound;

