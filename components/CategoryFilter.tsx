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
import { Loader2 } from 'lucide-react';



const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();
                if (fetchedCategories) {
                    setCategories(fetchedCategories as ICategory[]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
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

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                <span className="text-sm text-gray-500">Loading categories...</span>
            </div>
        );
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="w-[250px] bg-white border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default CategoryFilter;

