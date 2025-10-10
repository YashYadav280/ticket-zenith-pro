import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "@/types/event";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  onBook?: (eventId: string) => void;
  onManage?: (eventId: string) => void;
  isOrganizer?: boolean;
}

export const EventCard = ({ event, onBook, onManage, isOrganizer = false }: EventCardProps) => {
  const spotsLeft = event.capacity - event.attendees;
  const fillPercentage = (event.attendees / event.capacity) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group animate-scale-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-40" />
      </div>
      
      <CardHeader>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{format(new Date(event.date), "PPP")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{event.attendees} / {event.capacity} attendees</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{fillPercentage.toFixed(0)}% Full</span>
            <span>{spotsLeft} spots left</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-primary h-full transition-all duration-500"
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {isOrganizer ? (
          <Button 
            onClick={() => onManage?.(event.id)} 
            variant="gradient" 
            className="w-full"
          >
            Manage Event
          </Button>
        ) : (
          <Button 
            onClick={() => onBook?.(event.id)} 
            variant="gradient" 
            className="w-full"
            disabled={spotsLeft === 0}
          >
            {spotsLeft === 0 ? "Sold Out" : "Book Ticket"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
