/* eslint-disable */
import React, { ReactNode } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ContentProps {
    children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className='content' id='Content'>
            <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-3xl'>
                Discover<br /> Some Events For You
            </h1>
            <div className="search-bar flex items-center justify-start my-10">
                <div className="search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="search-bar" placeholder="Search for an event" />
                </div>
                <div className='sort'>
                    <Select>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* Cards Section */}
            <div className="cards mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {children}
            </div>
        </div>
    );
};

export default Content;
