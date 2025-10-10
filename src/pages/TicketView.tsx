import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, ArrowLeft, CheckCircle2 } from "lucide-react";
import QRCode from "qrcode";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockEvents } from "@/lib/mockData";
import { format } from "date-fns";

const TicketView = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  // Mock ticket data - in real app, this would come from API
  const ticket = {
    id: ticketId,
    ticketNumber: `TKT-2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    attendeeName: "Mike Chen",
    eventId: "evt-1",
    checkedIn: false,
  };

  const event = mockEvents.find(e => e.id === ticket.eventId);

  useEffect(() => {
    if (canvasRef.current && ticket) {
      QRCode.toCanvas(
        canvasRef.current,
        ticket.ticketNumber,
        {
          width: 280,
          margin: 2,
          color: {
            dark: "#7c3aed",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error);
          else setQrGenerated(true);
        }
      );
    }
  }, [ticket]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `ticket-${ticket.ticketNumber}.png`;
      link.href = url;
      link.click();
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Event not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="animate-scale-in">
          <Card className="overflow-hidden shadow-elegant">
            <div className="h-48 bg-gradient-primary relative">
              <div className="absolute inset-0 bg-gradient-overlay opacity-30" />
              <div className="relative h-full flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white">Digital Ticket</h1>
              </div>
            </div>

            <CardHeader className="text-center border-b">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-muted-foreground">{event.venue}</p>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold">
                    {format(new Date(event.date), "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Attendee</p>
                  <p className="font-semibold">{ticket.attendeeName}</p>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Ticket Number</p>
                <p className="text-xl font-bold font-mono">{ticket.ticketNumber}</p>
              </div>

              <div className="flex flex-col items-center py-4">
                <div className="bg-white p-4 rounded-lg shadow-card mb-4">
                  <canvas ref={canvasRef} />
                </div>
                
                {qrGenerated && (
                  <div className="flex items-center gap-2 text-success text-sm mb-4">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>QR Code generated successfully</span>
                  </div>
                )}

                <p className="text-sm text-muted-foreground text-center mb-4">
                  Present this QR code at the venue for check-in
                </p>

                <Button
                  onClick={handleDownload}
                  variant="gradient"
                  size="lg"
                  className="gap-2"
                  disabled={!qrGenerated}
                >
                  <Download className="w-4 h-4" />
                  Download Ticket
                </Button>
              </div>

              {ticket.checkedIn && (
                <div className="bg-success/10 border border-success rounded-lg p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-semibold text-success">Checked In</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TicketView;
