import React from 'react';
import { Calendar } from 'lucide-react';

const Footer = () => {
    return (
        <footer className='bg-gray-100 py-8'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <div className='flex items-center mb-4 md:mb-0'>
                        <Calendar className="h-6 w-6 text-purple-600 mr-2" />
                        <span className='text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                            EvenTNi
                        </span>
                    </div>
                    <div className='text-sm text-gray-600'>
                        &copy; {new Date().getFullYear()} EvenTNi. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

