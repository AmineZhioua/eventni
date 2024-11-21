'use server'

import { connectToDatabase } from "../database"
import Category from "../database/models/category.model";
import { handleError } from "../utils";

const getAllCategories = async() => {
    try {
        await connectToDatabase();
        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
        
    } catch(error) {
        handleError(error);
    }
};

export default getAllCategories;