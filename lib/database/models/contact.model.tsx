import mongoose from "mongoose";
import { Document } from "mongoose";


const { Schema, models, model } = mongoose;

export interface IContact extends Document {
    subject: string;
    message: string;
}


// Create a Contact Schema
const ContactSchema = new Schema({
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Contact = models.Contact || model("Contact", ContactSchema);



export default Contact;