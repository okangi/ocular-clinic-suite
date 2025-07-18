import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Eye, 
  FileText, 
  Package, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const statsCards = [
  {
    title: "Today's Appointments",
    value: "24",
    change: "+12%",
    icon: Calendar,
    color: "text-primary"
  },
  {
    title: "Active Patients",
    value: "1,247",
    change: "+3%",
    icon: Users,
    color: "text-accent"
  },
  {
    title: "Pending Prescriptions",
    value: "8",
    change: "-2",
    icon: FileText,
    color: "text-warning"
  },
  {
    title: "Low Stock Items",
    value: "5",
    change: "+1",
    icon: Package,
    color: "text-destructive"
  }
];

const recentAppointments = [
  { id: 1, patient: "John Smith", time: "09:00 AM", type: "Annual Exam", status: "confirmed" },
  { id: 2, patient: "Sarah Johnson", time: "10:30 AM", type: "Contact Lens Fitting", status: "in-progress" },
  { id: 3, patient: "Mike Brown", time: "02:00 PM", type: "Follow-up", status: "pending" },
  { id: 4, patient: "Emily Davis", time: "03:30 PM", type: "Vision Screening", status: "confirmed" },
];

const clinicTasks = [
  { id: 1, task: "Review insurance claims", priority: "high", due: "Today" },
  { id: 2, task: "Update inventory records", priority: "medium", due: "Tomorrow" },
  { id: 3, task: "Send appointment reminders", priority: "low", due: "This week" },
];

export function Dashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  const handleViewAllAppointments = () => {
    navigate('/appointments');
  };

  const handleViewAllTasks = () => {
    navigate('/reports'); // Tasks can be managed in reports section
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">Welcome back! Here's what's happening at your clinic today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((stat) => (
          <Card 
            key={stat.title} 
            className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={() => handleQuickAction(
              stat.title.includes('Appointments') ? '/appointments' :
              stat.title.includes('Patients') ? '/patients' :
              stat.title.includes('Prescriptions') ? '/prescriptions' :
              '/inventory'
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                {" "}from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Appointments
            </CardTitle>
            <CardDescription className="text-sm">Manage your patient schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer gap-3"
                onClick={() => handleQuickAction('/appointments')}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm md:text-base truncate">{appointment.patient}</p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="text-xs md:text-sm font-medium">{appointment.time}</span>
                  <Badge 
                    variant={
                      appointment.status === 'confirmed' ? 'default' :
                      appointment.status === 'in-progress' ? 'secondary' : 'outline'
                    }
                    className="capitalize text-xs"
                  >
                    {appointment.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                    {appointment.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4 gap-2" 
              onClick={handleViewAllAppointments}
            >
              View All Appointments
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Clinic Tasks */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <AlertCircle className="h-5 w-5 text-warning" />
              Clinic Tasks
            </CardTitle>
            <CardDescription className="text-sm">Pending administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {clinicTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleQuickAction('/reports')}
              >
                <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                  task.priority === 'high' ? 'bg-destructive' :
                  task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium">{task.task}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4 gap-2" 
              onClick={handleViewAllTasks}
            >
              View All Tasks
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <TrendingUp className="h-5 w-5 text-accent" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-sm">Common clinic management actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={() => handleQuickAction('/patients')}
            >
              <Users className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm">Add Patient</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={() => handleQuickAction('/appointments')}
            >
              <Calendar className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm">Book Appointment</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={() => handleQuickAction('/examinations')}
            >
              <Eye className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm">Start Exam</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={() => handleQuickAction('/prescriptions')}
            >
              <FileText className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs md:text-sm">Write Prescription</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}