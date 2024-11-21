'use server'

import { connectToDatabase } from "../database"
import Category from "../database/models/category.model";
import Event from "../database/models/event.model";
import User from "../database/models/user.models";
import { handleError } from "../utils";
import { CreateEventParams, GetAllEventsParams } from "@/types";

/* eslint-disable */
const populateEvent = async(query: any) => {
    return query.populate({ path: 'organizer', model: User, select: "_id firstName lastName" })
    .populate({ path: "category", model: Category, select: "_id name" })
}


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
        throw error;
    }
}


const getEventById = async(eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findOne({_id: eventId}).lean());

        if(!event) {
            throw new Error("Event not found!");
        }

        return JSON.parse(JSON.stringify(event));

    } catch(error) {
        handleError(error);
        throw error;
    }
}


const getAllEvents = async({ query, limit=6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const conditions = {};
        const eventQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit);

        const events = await populateEvent(eventQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        }
    } catch(error) {
        handleError(error);
        throw error;
    }
}


export default createEvent;
export { getEventById };
export { getAllEvents };