'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
// import { useRouter } from 'next/compat/router';



const SearchInput = ({ placeholder } : { placeholder: string }) => {
    const[query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayBebounceFn = setTimeout(() => {
            let newUrl = '';
            if(query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                });
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query'] 
                });
            }

            router.push(newUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(delayBebounceFn);
    }, [query, searchParams, router]);

    return (
        <div className="flex min-h-[54px] w-full overflow-hidden rounded-ful px-4 py-2" >
            <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} />
            <Input 
                type='text' 
                placeholder={placeholder} 
                onChange={(e) => setQuery(e.target.value)} 
                className='w-full'
            />
        </div>
    );
}




export default SearchInput;