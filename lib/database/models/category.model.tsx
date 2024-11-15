import mongoose from "mongoose";
import { Document } from "mongoose";

const { Schema, models, model } = mongoose;

export interface ICategory extends Document {
    _id: string,
    name: string,
}

// Create a User Schema
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;