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
    type: "Create" | "Update"
}

/* eslint-disable */
const EventForm = ({ userId, type }: EventFormProps) => {
    const[files, setFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
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
        },
    });
     
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Textarea placeholder="Tell more about your event" {...field} />
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
                <Button type="submit">Submit</Button>
            </form>
    </Form>
    );
}



export default EventForm;