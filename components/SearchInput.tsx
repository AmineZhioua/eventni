'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from './ui/input';



const SearchInput = ({ placeholder } : { placeholder: string }) => {
    /* eslint-disable */
    const[query, setQuery] = useState('');


    return (
        <div className="flex min-h-[54px] w-full overflow-hidden rounded-full bg-grey-500 px-4 py-2" >
            <Image src="/assets/icons/search.svg" alt='search' width={20} height={20} />
            <Input 
                type='text' 
                placeholder={placeholder} 
                onChange={(e) => setQuery(e.target.value)} 
                className='max-w-[500px]'
            />
        </div>
    );
}




export default SearchInput;