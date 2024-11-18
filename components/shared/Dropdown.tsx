import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { useState } from "react"
  

type DropdownProps = {
    value?: string,
    onChangeHandler?: (value: string) => void
}

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
    /* eslint-disable */
    const[category, setCategory] = useState<ICategory[]>([]);

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