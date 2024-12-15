'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react'
import { deleteEvent } from '@/lib/actions/event.actions';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

const Delete = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-5 w-5" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500">
                        This action cannot be undone. This will permanently delete the event and remove all associated data.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            startTransition(async () => {
                                await deleteEvent({ eventId, path: pathname })
                            })
                        }
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Delete;

