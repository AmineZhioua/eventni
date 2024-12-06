import Landing from "@/components/Landing";
import Content from "@/components/Content";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function HomePage() {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6,
  });

  return (
    <main>
      <Landing />
      <Content 
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateText="Come Back Later"
        collectionType="All_Events"
        limit={6}
        page={1}
        totalPages={2}
      />
    </main>
  );
}
