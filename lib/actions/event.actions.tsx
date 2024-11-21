'use server'

import { connectToDatabase } from "../database"
import Event from "../database/models/event.model";
import User from "../database/models/user.models";
import { handleError } from "../utils";
import { CreateEventParams } from "@/types";

/* eslint-disable */
const createEvent = async({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase();
        const organizer = await User.findOne({ _id: userId });

        if(!organizer) {
            throw new Error("Event Creator not found!");
        }

        const newEvent = await Event.create({...event, category: event.categoryId, organizer: userId });

        return JSON.parse(JSON.stringify(newEvent));

    } catch(error) {
        handleError(error);
    }
}

export default createEvent;