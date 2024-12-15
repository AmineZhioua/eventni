"use client"
/* eslint-disable */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Dropdown from "./shared/Dropdown"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./shared/FileUploader"
import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "./ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import createEvent, { updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import { Calendar, MapPin, DollarSign, LinkIcon } from 'lucide-react'

const eventFormSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters" }),
  description: z.string().min(15, "Description must be at least 15 characters").max(500, "Description can't be more than 500 characters"),
  location: z.string().min(5, "Location must be at least 5 characters").max(500, "Location can't be more than 500 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

type EventFormProps = {
    userId: string,
    type: "Create" | "Update",
    event?: IEvent,
    eventId?: string,
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
    const[files, setFiles] = useState<File[]>([]);
    const initialValues = event && type === 'Update' ? {
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
    } : {
        title: "",
        description: "",
        location: "",
        imageUrl: "",
        startDateTime: new Date(),
        endDateTime: new Date(),
        categoryId: "",
        price: "",
        isFree: false,
        url: ""
    }

    const Router = useRouter();
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    });
     
    const { startUpload } = useUploadThing('imageUploader');

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImgUrl = values.imageUrl;
        if(files.length > 0) {
            const uploadedImages = await startUpload(files);
            if(!uploadedImages) {
                return;
            } else {
                uploadedImgUrl = uploadedImages[0].url;
            }
        }

        if(type === "Create") {
            try {
                const newEvent = await createEvent({
                    event: {...values, imageUrl: uploadedImgUrl},
                    userId,
                    path: '/profile'
                });
                if(newEvent) {
                    form.reset();
                    Router.push(`/events/${newEvent._id}`);
                }
            } catch(error) {
                console.log(error);
            }
        }

        if(type === "Update") {
            if(!eventId) {
                Router.back();
                return;
            }
            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: {...values, imageUrl: uploadedImgUrl, _id: eventId},
                    path: `/events/${eventId}`
                });
                if(updatedEvent) {
                    form.reset();
                    Router.push(`/events/${updatedEvent._id}`);
                }
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-lg shadow-md">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your event title" {...field} className="focus:ring-2 focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Dropdown onChangeHandler={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell more about your event" {...field} className="focus:ring-2 focus:ring-purple-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
                                    <Input placeholder="Enter event location or make it online" className="pl-10 focus:ring-2 focus:ring-purple-500" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Start Date</FormLabel>
                                <FormControl>
                                    <div className="flex items-center relative">
                                        <Calendar className="absolute left-3 h-5 w-5 text-gray-400" />
                                        <DatePicker 
                                            selected={field.value} 
                                            onChange={(date) => field.onChange(date)} 
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="w-full"
                                            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event End Date</FormLabel>
                                <FormControl>
                                    <div className="flex items-center relative">
                                        <Calendar className="absolute left-3 h-5 w-5 text-gray-400" />
                                        <DatePicker 
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)} 
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="w-full"
                                            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <DollarSign className="absolute left-3 h-5 w-5 text-gray-400" />
                                    <Input type="number" placeholder="Enter a price" className="pl-10 focus:ring-2 focus:ring-purple-500" {...field} />
                                    <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                            <FormItem className="absolute right-3 flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox 
                                                        checked={field.value} 
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm">Free</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <LinkIcon className="absolute left-3 h-5 w-5 text-gray-400" />
                                    <Input placeholder="Enter the url to your event" className="pl-10 focus:ring-2 focus:ring-purple-500" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Loading...
                        </div>
                    ) : `${type} Event`}
                </Button>
            </form>
        </Form>
    );
}

export default EventForm;

