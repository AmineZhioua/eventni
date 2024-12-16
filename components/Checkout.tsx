import { IEvent } from '@/lib/database/models/event.model';
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/orders.actions';



const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {

    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);

    
    const onCheckout = async() => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        }

        await checkoutOrder(order);
    }
    return (
        <form action={onCheckout}>
            <Button 
                type='submit' 
                role='link' 
                className="bg-purple-600 hover:bg-purple-700 w-full text-white font-semibold py-2 px-6 rounded-sm transition duration-300 ease-in-out transform hover:scale-105"
            >
                { event.isFree ? 'Get Free Ticket' : 'Buy Ticket' }
            </Button>
        </form>
    );
}




export default Checkout;