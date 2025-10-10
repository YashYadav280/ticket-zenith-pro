export type UserRole = "organizer" | "attendee";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  capacity: number;
  organizerId: string;
  attendees: number;
  imageUrl?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  attendeeId: string;
  attendeeName: string;
  ticketNumber: string;
  qrCode: string;
  bookedAt: string;
  checkedIn: boolean;
}

export interface Analytics {
  totalEvents: number;
  totalAttendees: number;
  checkInRate: number;
  eventsByMonth: { month: string; count: number }[];
  topEvents: { name: string; attendees: number }[];
}
