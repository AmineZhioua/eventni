'use client';

import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContact } from '@/lib/actions/contact.actions';

const contactFormSchema = z.object({
    subject: z.string().min(10, { message: "Subject must be at least 10 characters" }),
    message: z.string().min(20, { message: "Message must be at least 20 characters" }).max(500, { message: "Message can't be more than 500 characters" }),
});

const ContactForm = () => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            subject: '',
            message: '',
        },
    });

    async function onSubmit(data: z.infer<typeof contactFormSchema>) {
        try {
            const newContact = await createContact(data);

            if (newContact) {
                form.reset();
                router.push('/contact');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-lg shadow-md">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g: I like your website"
                                    {...field}
                                    className="focus:ring-2 focus:ring-purple-500"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us whatever is in your mind..."
                                    {...field}
                                    className="focus:ring-2 focus:ring-purple-500"
                                />
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
                    ) : `Submit`}
                </Button>
            </form>
        </Form>
    );
};

export default ContactForm;