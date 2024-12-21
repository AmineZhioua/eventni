'use server'

import Contact from "../database/models/contact.model";
import { handleError } from '@/lib/utils';
import { connectToDatabase } from '@/lib/database';
import { CreateContactParams } from "@/types";


export async function createContact(contact: CreateContactParams) {
    try {
        await connectToDatabase();

        const newContact = await Contact.create(contact);
        return JSON.parse(JSON.stringify(newContact));
    } catch (error) {
        handleError(error);
    }
}
