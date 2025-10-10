import { useState } from "react";
import { Plus, BarChart3, Users, Calendar as CalendarIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvents, mockAnalytics } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

const COLORS = ['hsl(262, 83%, 58%)', 'hsl(230, 90%, 60%)', 'hsl(28, 100%, 60%)', 'hsl(142, 76%, 36%)'];

const OrganizerDashboard = () => {
  const [events, setEvents] = useState(mockEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    capacity: "",
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const event = {
      id: `evt-${Date.now()}`,
      ...newEvent,
      capacity: parseInt(newEvent.capacity),
      organizerId: "org-1",
      attendees: 0,
    };

    setEvents([...events, event]);
    setNewEvent({ title: "", date: "", venue: "", description: "", capacity: "" });
    setOpen(false);
    toast.success("Event created successfully!");
  };

  const handleManageEvent = (eventId: string) => {
    toast.info("Opening event management panel...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Organizer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your events and track performance
          </p>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="events" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              My Events
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="checkin" className="gap-2">
              <Users className="w-4 h-4" />
              Check-In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Events</h2>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="gradient" size="lg" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new event
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Annual Tech Conference"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newEvent.capacity}
                          onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                          placeholder="100"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                        placeholder="Convention Center Hall A"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Describe your event..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" variant="gradient" className="w-full" size="lg">
                      Create Event
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isOrganizer
                  onManage={handleManageEvent}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardDescription>Total Events</CardDescription>
                  <CardTitle className="text-3xl">{mockAnalytics.totalEvents}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Total Attendees</CardDescription>
                  <CardTitle className="text-3xl">{mockAnalytics.totalAttendees}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Check-In Rate</CardDescription>
                  <CardTitle className="text-3xl">{mockAnalytics.checkInRate}%</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Events by Month</CardTitle>
                  <CardDescription>Event creation trend</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalytics.eventsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(262, 83%, 58%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Events</CardTitle>
                  <CardDescription>By attendee count</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockAnalytics.topEvents}
                        dataKey="attendees"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {mockAnalytics.topEvents.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="checkin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Scanner</CardTitle>
                <CardDescription>
                  Scan attendee QR codes to check them in
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-64 h-64 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <p className="text-muted-foreground text-center">
                    QR Scanner<br />
                    <span className="text-sm">(Camera access required)</span>
                  </p>
                </div>
                <Button variant="gradient" size="lg">
                  Start Scanning
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
