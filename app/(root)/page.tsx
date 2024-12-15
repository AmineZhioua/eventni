import Landing from "@/components/Landing";
import Content from "@/components/Content";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function HomePage({ 
    searchParams 
  }: { 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  
  const resolvedSearchParams = await searchParams;
    
  const searchText = (resolvedSearchParams?.query as string) || '';
  const category = (resolvedSearchParams?.category as string) || '';
  const pageParam = Number(resolvedSearchParams?.page) || 1;

  const events = await getAllEvents({
    query: searchText,
    category,
    page: pageParam,
    limit: 6,
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <Landing />
      <Content 
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateText="Come Back Later"
        collectionType="All_Events"
        limit={6}
        page={pageParam}
        totalPages={events?.totalPages}
      />
    </div>
  );
}

