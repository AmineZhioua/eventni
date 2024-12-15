import EventForm from "@/components/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

const EventUpdate = async ({
    params 
}: { 
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    const event = await getEventById(id);
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    return (
        <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
                        Update Your Event
                    </h1>
                    <p className="text-xl text-gray-600">
                        Refine and perfect your event details
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-xl p-6 sm:p-10">
                    <EventForm 
                        userId={userId} 
                        event={event} 
                        eventId={event._id} 
                        type="Update" 
                    />
                </div>
            </div>
        </section>
    );
}

export default EventUpdate;

