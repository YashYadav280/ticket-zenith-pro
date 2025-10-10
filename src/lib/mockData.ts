import { Event, Ticket, Analytics, User } from "@/types/event";

// Mock users
export const mockUsers: User[] = [
  {
    id: "org-1",
    email: "organizer@events.com",
    name: "Sarah Johnson",
    role: "organizer",
  },
  {
    id: "att-1",
    email: "attendee@events.com",
    name: "Mike Chen",
    role: "attendee",
  },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: "evt-1",
    title: "Tech Innovation Summit 2025",
    date: "2025-11-15",
    venue: "Silicon Valley Convention Center",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders, networking opportunities, and cutting-edge product demonstrations.",
    capacity: 500,
    organizerId: "org-1",
    attendees: 342,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
  },
  {
    id: "evt-2",
    title: "Digital Marketing Masterclass",
    date: "2025-11-22",
    venue: "Downtown Business Hub",
    description: "Learn the latest digital marketing strategies from experts. Topics include SEO, social media marketing, content strategy, and analytics.",
    capacity: 150,
    organizerId: "org-1",
    attendees: 98,
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
  },
  {
    id: "evt-3",
    title: "AI & Machine Learning Workshop",
    date: "2025-12-05",
    venue: "Tech Campus Building A",
    description: "Hands-on workshop covering fundamentals of AI and ML. Build real projects and learn from practicing data scientists.",
    capacity: 80,
    organizerId: "org-1",
    attendees: 67,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  },
  {
    id: "evt-4",
    title: "Startup Pitch Competition",
    date: "2025-12-10",
    venue: "Innovation Center",
    description: "Watch ambitious entrepreneurs pitch their groundbreaking ideas to top investors. Network with founders and VCs.",
    capacity: 200,
    organizerId: "org-1",
    attendees: 156,
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
  },
];

// Mock tickets
export const mockTickets: Ticket[] = [
  {
    id: "tkt-1",
    eventId: "evt-1",
    attendeeId: "att-1",
    attendeeName: "Mike Chen",
    ticketNumber: "TKT-2025-001234",
    qrCode: "",
    bookedAt: new Date().toISOString(),
    checkedIn: false,
  },
];

// Mock analytics
export const mockAnalytics: Analytics = {
  totalEvents: 4,
  totalAttendees: 663,
  checkInRate: 78.5,
  eventsByMonth: [
    { month: "Jan", count: 3 },
    { month: "Feb", count: 5 },
    { month: "Mar", count: 4 },
    { month: "Apr", count: 6 },
    { month: "May", count: 8 },
    { month: "Jun", count: 7 },
  ],
  topEvents: [
    { name: "Tech Summit", attendees: 342 },
    { name: "Startup Pitch", attendees: 156 },
    { name: "Marketing Class", attendees: 98 },
    { name: "AI Workshop", attendees: 67 },
  ],
};
