import SearchInput from '@/components/SearchInput';
import { getOrdersByEvent } from '@/lib/actions/orders.actions';
import { IOrderItem } from '@/lib/database/models/order.model';
import { formatDateTime, formatPrice } from '@/lib/utils';
import React, { Suspense } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileText, Loader2 } from 'lucide-react';

const OrdersPage = async({
    searchParams
    } : {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {

    const resolvedSearchParams = await searchParams;

    const eventId = (resolvedSearchParams?.eventId as string) || '';
    const searchText = (resolvedSearchParams?.query as string) || '';
    
    const orders = await getOrdersByEvent({
        eventId: eventId,
        searchString: searchText
    });

    return (
        <div className="bg-gradient-to-br mt-10 from-purple-50 via-white to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <section className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                        Event Orders
                    </h1>
                    <p className="text-xl text-gray-600">
                        Manage and track all orders for your event
                    </p>
                </section>

                <section className="mb-8">
                    <Suspense fallback={
                        <div className="flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                            <span className="ml-2 text-gray-600">Loading search...</span>
                        </div>
                    }>
                        <SearchInput placeholder="Search buyer name..." />
                    </Suspense>
                </section>

                <section className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Table>
                        <TableCaption>A list of your recent orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] font-semibold">Order ID</TableHead>
                                <TableHead className="font-semibold">Event Title</TableHead>
                                <TableHead className="font-semibold">Buyer</TableHead>
                                <TableHead className="font-semibold">Created</TableHead>
                                <TableHead className="text-right font-semibold">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders && orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <FileText className="h-8 w-8 mb-2" />
                                            <p>No orders found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {orders &&
                                        orders.map((row: IOrderItem) => (
                                            <TableRow key={row._id} className="hover:bg-gray-50 transition-colors">
                                                <TableCell className="font-medium">{row._id}</TableCell>
                                                <TableCell>{row.eventTitle}</TableCell>
                                                <TableCell>{row.buyer}</TableCell>
                                                <TableCell>{formatDateTime(row.createdAt).dateTime}</TableCell>
                                                <TableCell className="text-right">{formatPrice(row.totalAmount)}</TableCell>
                                            </TableRow>
                                        ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </section>
            </div>
        </div>
    );
}

export default OrdersPage;

