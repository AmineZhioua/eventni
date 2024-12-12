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
        <>
            <section className='wrapper pt-24 sm:pt-24 lg:pt-24'>
            <h1 className='text-balance font-semibold tracking-tight text-gray-900 sm:text-xl sm:text-center'>Orders</h1>
            </section>

            <section className="wrapper mt-8">
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchInput placeholder="Search buyer name..." />
                </Suspense>
            </section>

            <section className="wrapper px-5">
                {/* <table className="w-full border-collapse border-t overflow-x-scroll">
                <thead>
                    <tr className="p-medium-14 border-b text-grey-500">
                    <th className="min-w-[250px] py-3 text-left">Order ID</th>
                    <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event Title</th>
                    <th className="min-w-[150px] py-3 text-left">Buyer</th>
                    <th className="min-w-[100px] py-3 text-left">Created</th>
                    <th className="min-w-[100px] py-3 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length === 0 ? (
                    <tr className="border-b">
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                        No orders found.
                        </td>
                    </tr>
                    ) : (
                    <>
                        {orders &&
                        orders.map((row: IOrderItem) => (
                            <tr
                            key={row._id}
                            className="p-regular-14 lg:p-regular-16 border-b "
                            style={{ boxSizing: 'border-box' }}>
                            <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                            <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventTitle}</td>
                            <td className="min-w-[150px] py-4">{row.buyer}</td>
                            <td className="min-w-[100px] py-4">
                                {formatDateTime(row.createdAt).dateTime}
                            </td>
                            <td className="min-w-[100px] py-4 text-right">
                                {formatPrice(row.totalAmount)}
                            </td>
                            </tr>
                        ))}
                    </>
                    )}
                </tbody>
                </table> */}

                <Table className='overflow-x-scroll mt-5 border rounded-md'>
                    <TableCaption className='text-black'>A list of your recent orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-black font-semibold">Order ID</TableHead>
                            <TableHead className='text-black font-semibold'>Event Title</TableHead>
                            <TableHead className='text-black font-semibold'>Buyer</TableHead>
                            <TableHead className="text-left text-black font-semibold">Created</TableHead>
                            <TableHead className="text-left text-black font-semibold">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders && orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="py-4 text-center text-black">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {orders &&
                                    orders.map((row: IOrderItem) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row._id}</TableCell>
                                            <TableCell>{row.eventTitle}</TableCell>
                                            <TableCell>{row.buyer}</TableCell>
                                            <TableCell>{formatDateTime(row.createdAt).dateTime}</TableCell>
                                            <TableCell className="text-left">{formatPrice(row.totalAmount)}</TableCell>
                                        </TableRow>
                                    ))}
                            </>
                        )}
                        {/* <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </section>
        </>
    );
}




export default OrdersPage;