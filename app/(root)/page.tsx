'use client';
import { useRouter } from "next/navigation";
import Landing from "@/components/Landing";
import Content from "@/components/Content";
import EventCard from "@/components/EventCard";

export default function HomePage() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/details');
  };

  return (
    <main>
      <Landing />
      <Content>
        <EventCard 
          imgName="dj-party.jpg" 
          eventTitle="Tropical Party in Coco Beach" 
          location="Carthage Beach" 
          price="100TND" 
          onClick={handleCardClick}
        />
        <EventCard 
          imgName="react-training.png" 
          eventTitle="Reactjs Training for students" 
          location="ISET Nabeul" 
          price="Free"
          onClick={handleCardClick}
        />
        <EventCard 
          imgName="bitcoin.jpg"
          eventTitle="Learn more about Bitcoin!"
          location="Centre Formation"
          price="500TND"
          onClick={handleCardClick}
        />
        <EventCard 
          imgName="camping.png"
          eventTitle="Camping in Fuji Mountain"
          location="CampLife"
          price="1000TND"
          onClick={handleCardClick}
        />
      </Content>
    </main>
  );
}
