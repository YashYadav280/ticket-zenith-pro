import { useState } from "react";
import { Ticket as TicketIcon, Calendar as CalendarIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockEvents } from "@/lib/mockData";
import { Event, Ticket } from "@/types/event";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AttendeeDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [bookedTickets, setBookedTickets] = useState<Ticket[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookTicket = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setConfirmOpen(true);
    }
  };

  const confirmBooking = () => {
    if (!selectedEvent) return;

    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      eventId: selectedEvent.id,
      attendeeId: "att-1",
      attendeeName: "Mike Chen",
      ticketNumber: `TKT-2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      qrCode: "",
      bookedAt: new Date().toISOString(),
      checkedIn: false,
    };

    setBookedTickets([...bookedTickets, newTicket]);
    setConfirmOpen(false);
    toast.success("Ticket booked successfully!");
    
    // Navigate to ticket view after a short delay
    setTimeout(() => {
      navigate(`/ticket/${newTicket.id}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Discover Events
          </h1>
          <p className="text-muted-foreground">
            Find and book tickets for amazing events
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="mytickets" className="gap-2">
              <TicketIcon className="w-4 h-4" />
              My Tickets ({bookedTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBook={handleBookTicket}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mytickets" className="space-y-6">
            {bookedTickets.length === 0 ? (
              <div className="text-center py-12">
                <TicketIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
                <p className="text-muted-foreground">
                  Book your first event to see your tickets here
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {bookedTickets.map((ticket) => {
                  const event = mockEvents.find(e => e.id === ticket.eventId);
                  return event ? (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-6 hover:shadow-card transition-shadow cursor-pointer"
                      onClick={() => navigate(`/ticket/${ticket.id}`)}
                    >
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ticket: {ticket.ticketNumber}
                      </p>
                      <Button variant="outline" className="w-full">
                        View Ticket
                      </Button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                Are you sure you want to book a ticket for this event?
              </DialogDescription>
            </DialogHeader>

            {selectedEvent && (
              <div className="py-4 space-y-2">
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">{selectedEvent.venue}</p>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={confirmBooking}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AttendeeDashboard;
