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
import Image from 'next/image'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "./ui/checkbox"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import createEvent, { updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
 
const eventFormSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters" }),

  description: z.string().min(15, "Description must be at least 15 characters")
  .max(500, "Description can't be more than 500 characters"),

  location: z.string().min(5, "Location must be at least 5 characters")
  .max(500, "Location can't be more than 500 characters"),

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

/* eslint-disable */
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
    // 2. Define a submit handler.
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Event Title Input */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your event title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event Category Select */}
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

                {/* Event Description Input */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell more about your event" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event Image Picker */}
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

                {/* Event Location Input */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <Image
                                        src="/assets/icons/location.svg"
                                        alt="location"
                                        className="absolute left-[10px]"
                                        width={24}
                                        height={24}
                                    />
                                    <Input placeholder="Enter event location or make it online" className="px-10" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event Start Date Input */}
                <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Start Date</FormLabel>
                            <FormControl className="w-full">
                                <div className="flex items-center relative w-full">
                                    <Image
                                        src="/assets/icons/calendar.svg"
                                        alt="calendar"
                                        className="absolute z-10 left-[10px]"
                                        width={24}
                                        height={24}
                                    />
                                    <DatePicker 
                                        className="relative w-full border px-5 pl-10 py-2 rounded-md"
                                        selected={field.value} 
                                        onChange={(date) => field.onChange(date)} 
                                        showTimeSelect
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        wrapperClassName="w-full"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event End Date Input */}
                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Event End Date</FormLabel>
                            <FormControl>
                                <div className="flex justify-center items-center relative">
                                    <Image
                                        src="/assets/icons/calendar.svg"
                                        alt="calendar"
                                        className="absolute z-10 left-[10px]"
                                        width={24}
                                        height={24}
                                    />
                                    <DatePicker 
                                        className="relative w-full border px-5 pl-10 py-2 rounded-md"
                                        selected={field.value} 
                                        onChange={(date) => field.onChange(date)} 
                                        showTimeSelect
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        wrapperClassName="w-full"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event Price Input */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <Image
                                        src="/assets/icons/money.svg"
                                        alt="location"
                                        className="absolute left-[10px]"
                                        width={24}
                                        height={24}
                                    />
                                    <Input className="pl-10" type="number" placeholder="Enter a price" {...field} />
                                    {/* Event isFree input */}
                                    <FormField
                                        control={form.control}
                                        name="isFree"
                                        render={({ field }) => (
                                            <FormItem className="absolute bg-white right-2">
                                                <FormControl>
                                                    <div className="flex items-center flex-row-reverse">
                                                        <p className="mx-2">Free</p>
                                                        <Checkbox 
                                                            onCheckedChange={field.onChange} 
                                                            checked={field.value} 
                                                            id="isFree" 
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Event URL Input */}
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <Image
                                        src="/assets/icons/url.svg"
                                        alt="location"
                                        className="absolute left-[10px]"
                                        width={24}
                                        height={24}
                                    />
                                    <Input placeholder="Enter the url to your event" className="px-11" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={form.formState.isSubmitting}
                >
                    { form.formState.isSubmitting ? ( 
                        "Loading..." ) : `${type} Event` }
                </Button>
            </form>
    </Form>
    );
}



export default EventForm;