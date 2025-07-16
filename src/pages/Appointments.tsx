import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Plus, 
  Clock, 
  User, 
  Phone,
  AlertCircle,
  CheckCircle,
  Eye,
  Filter
} from "lucide-react";

const todayAppointments = [
  {
    id: 1,
    time: "09:00 AM",
    patient: "John Smith",
    type: "Annual Eye Exam",
    duration: "45 min",
    status: "confirmed",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    time: "10:00 AM",
    patient: "Sarah Johnson",
    type: "Contact Lens Fitting",
    duration: "30 min",
    status: "in-progress",
    phone: "(555) 234-5678"
  },
  {
    id: 3,
    time: "11:30 AM",
    patient: "Mike Brown",
    type: "Follow-up Visit",
    duration: "20 min",
    status: "pending",
    phone: "(555) 345-6789"
  },
  {
    id: 4,
    time: "02:00 PM",
    patient: "Emily Davis",
    type: "Vision Screening",
    duration: "30 min",
    status: "confirmed",
    phone: "(555) 456-7890"
  },
  {
    id: 5,
    time: "03:30 PM",
    patient: "Robert Wilson",
    type: "Prescription Update",
    duration: "15 min",
    status: "confirmed",
    phone: "(555) 567-8901"
  }
];

const upcomingAppointments = [
  {
    id: 1,
    date: "Tomorrow",
    count: 18,
    slots: "3 available"
  },
  {
    id: 2,
    date: "Friday",
    count: 22,
    slots: "1 available"
  },
  {
    id: 3,
    date: "Monday",
    count: 15,
    slots: "8 available"
  }
];

export default function Appointments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointment Scheduling</h1>
          <p className="text-muted-foreground">Manage patient appointments, scheduling, and automated reminders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="shadow-elegant">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Appointment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">No-shows</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">96%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>January 25, 2024 - All appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.patient}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      appointment.status === 'confirmed' ? 'default' :
                      appointment.status === 'in-progress' ? 'secondary' : 'outline'
                    }
                    className="capitalize"
                  >
                    {appointment.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                    {appointment.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {appointment.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {appointment.time} ({appointment.duration})
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {appointment.phone}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Start Exam
                    </Button>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Days */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Upcoming Schedule
            </CardTitle>
            <CardDescription>Next few days overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((day) => (
              <div key={day.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{day.date}</h3>
                  <Badge variant="secondary">{day.count} appointments</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{day.slots}</p>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Scheduling Actions</CardTitle>
          <CardDescription>Common appointment management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Book Appointment
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              View Calendar
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Phone className="h-5 w-5" />
              Send Reminders
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Clock className="h-5 w-5" />
              Manage Availability
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}