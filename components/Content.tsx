import { auth } from '@clerk/nextjs/server'
import ContentClient from './ContentClient'
import { IEvent } from '@/lib/database/models/event.model';

interface ContentProps {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_organized' | 'My_Tickets' | 'All_Events'
}

async function Content({ 
    data, 
    emptyTitle, 
    emptyStateSubtext, 
    collectionType, 
    limit, 
    page, 
    totalPages = 0,
    urlParamName 
}: ContentProps) {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    const isEventCreator = (eventOrganizerId: string) => {
        return userId === eventOrganizerId;
    };

    return (
        <ContentClient
            data={data}
            emptyTitle={emptyTitle}
            emptyStateSubtext={emptyStateSubtext}
            collectionType={collectionType}
            limit={limit}
            page={page}
            totalPages={totalPages}
            urlParamName={urlParamName}
            isEventCreator={isEventCreator}
        />
    )
}

export default Content;