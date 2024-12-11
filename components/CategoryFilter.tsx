'use client'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import getAllCategories from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/database/models/category.model';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
  


const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                if (categories) {
                    setCategories(categories as ICategory[]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const onSelectCategory = (category: string) => {
        let newUrl = '';
        if(category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category'] 
            });
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {
                    categories.length > 0 && categories.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                            {category.name}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    );
}




export default CategoryFilter;