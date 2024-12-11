'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { formUrlQuery } from '@/lib/utils';

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
        <div className='flex justify-center items-center mt-8'>
            <Button variant='outline' onClick={() => onClick('prev')} disabled={Number(page) <= 1} className='mr-4'>
                Prev
            </Button>
            <p>{page}</p>
            <Button variant='outline' onClick={() => onClick('next')} disabled={Number(page) == totalPages} className='ml-4'>
                Next
            </Button>
        </div>
    );
}




export default Pagination;