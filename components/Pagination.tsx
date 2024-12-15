'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { formUrlQuery } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    page: number | string;
    totalPages: number;
    urlParamName?: string;
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClick = (btnType: string) => {
        const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({ 
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString()
        });

        router.push(newUrl, { scroll: false });
    }

    return (
        <div className='flex justify-center items-center mt-8 space-x-2'>
            <Button 
                variant='outline' 
                onClick={() => onClick('prev')} 
                disabled={Number(page) <= 1}
                className='flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
            </Button>
            <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                {page} of {totalPages}
            </span>
            <Button 
                variant='outline' 
                onClick={() => onClick('next')} 
                disabled={Number(page) >= totalPages}
                className='flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default Pagination;

