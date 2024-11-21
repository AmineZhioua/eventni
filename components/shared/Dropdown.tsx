import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import getAllCategories from "@/lib/actions/category.actions";
import { useEffect, useState } from "react"
  

type DropdownProps = {
    value?: string,
    onChangeHandler?: (value: string) => void
}

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
    const[category, setCategory] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                if (categories) {
                    setCategory(categories as ICategory[]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                {category.length > 0 && category.map((c) => (
                    <SelectItem key={c._id} value={c._id} >
                        {c.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}




export default Dropdown;