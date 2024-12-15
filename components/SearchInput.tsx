'use client'
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const SearchInput = ({ placeholder } : { placeholder: string }) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
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

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router]);

    return (
        <div className="relative flex items-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition-all duration-300">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <Input 
                type='text' 
                placeholder={placeholder} 
                onChange={(e) => setQuery(e.target.value)} 
                className='w-full bg-transparent border-none focus:outline-none placeholder-gray-500 text-gray-900'
            />
        </div>
    );
}

export default SearchInput;

