import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Eye, 
  FileText, 
  Plus, 
  Clock, 
  User,
  Stethoscope,
  Activity,
  CheckCircle,
  AlertCircle,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in real app this would come from API
const mockData = {
  todayPatients: [
    { id: 1, name: "John Smith", time: "09:00 AM", type: "Annual Exam", status: "waiting" },
    { id: 2, name: "Sarah Johnson", time: "10:00 AM", type: "Contact Fitting", status: "in-progress" },
    { id: 3, name: "Mike Brown", time: "11:30 AM", type: "Follow-up", status: "scheduled" }
  ],
  pendingTasks: [
    { id: 1, task: "Review prescription for John Smith", priority: "high" },
    { id: 2, task: "Complete insurance verification", priority: "medium" },
    { id: 3, task: "Schedule follow-up appointments", priority: "low" }
  ]
};

export function RoleBasedDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile) return null;

  const role = profile.role;

  const QuickActions = () => {
    const actions = {
      optometrist: [
        { icon: Eye, label: "Start Exam", action: () => navigate("/examinations"), color: "bg-primary/10 text-primary" },
        { icon: FileText, label: "Write Prescription", action: () => navigate("/prescriptions"), color: "bg-accent/10 text-accent" },
        { icon: Calendar, label: "View Schedule", action: () => navigate("/appointments"), color: "bg-success/10 text-success" },
        { icon: User, label: "Patient Records", action: () => navigate("/patients"), color: "bg-warning/10 text-warning" }
      ],
      admin: [
        { icon: Users, label: "Manage Users", action: () => navigate("/users"), color: "bg-primary/10 text-primary" },
        { icon: Activity, label: "View Reports", action: () => navigate("/reports"), color: "bg-accent/10 text-accent" },
        { icon: Calendar, label: "Clinic Schedule", action: () => navigate("/appointments"), color: "bg-success/10 text-success" },
        { icon: FileText, label: "Analytics", action: () => navigate("/reports"), color: "bg-warning/10 text-warning" }
      ],
      technician: [
        { icon: Stethoscope, label: "Equipment Check", action: () => navigate("/examinations"), color: "bg-primary/10 text-primary" },
        { icon: Calendar, label: "Patient Prep", action: () => navigate("/appointments"), color: "bg-accent/10 text-accent" },
        { icon: User, label: "Patient Records", action: () => navigate("/patients"), color: "bg-success/10 text-success" },
        { icon: FileText, label: "Test Results", action: () => navigate("/examinations"), color: "bg-warning/10 text-warning" }
      ],
      receptionist: [
        { icon: Calendar, label: "Book Appointment", action: () => navigate("/appointments"), color: "bg-primary/10 text-primary" },
        { icon: User, label: "Patient Check-in", action: () => navigate("/patients"), color: "bg-accent/10 text-accent" },
        { icon: CheckCircle, label: "Insurance Verify", action: () => navigate("/patients"), color: "bg-success/10 text-success" },
        { icon: FileText, label: "Print Forms", action: () => navigate("/prescriptions"), color: "bg-warning/10 text-warning" }
      ]
    };

    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>
            {role === 'optometrist' && "Start examinations and manage patient care"}
            {role === 'admin' && "Manage clinic operations and staff"}
            {role === 'technician' && "Prepare equipment and assist with procedures"}
            {role === 'receptionist' && "Handle appointments and patient check-ins"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {actions[role]?.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={action.action}
                className="h-20 flex-col gap-2 hover:shadow-md transition-all"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const TodaySchedule = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Today's Schedule
        </CardTitle>
        <CardDescription>
          {role === 'optometrist' && "Your patient appointments"}
          {role === 'admin' && "Clinic overview"}
          {role === 'technician' && "Preparation schedule"}
          {role === 'receptionist' && "Front desk appointments"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockData.todayPatients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">{patient.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{patient.time}</span>
                <Badge 
                  variant={
                    patient.status === 'in-progress' ? 'default' :
                    patient.status === 'waiting' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {patient.status}
                </Badge>
              </div>
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-3"
            onClick={() => navigate("/appointments")}
          >
            View Full Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PendingTasks = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-accent" />
          Pending Tasks
        </CardTitle>
        <CardDescription>Items requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockData.pendingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className={`h-4 w-4 ${
                  task.priority === 'high' ? 'text-destructive' :
                  task.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                }`} />
                <p className="text-sm">{task.task}</p>
              </div>
              <Badge 
                variant={
                  task.priority === 'high' ? 'destructive' :
                  task.priority === 'medium' ? 'secondary' : 'outline'
                }
                className="text-xs"
              >
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Role-specific header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome, {profile.first_name}
          </h1>
          <p className="text-muted-foreground">
            {role === 'optometrist' && "Ready to provide exceptional eye care"}
            {role === 'admin' && "Manage your clinic operations"}
            {role === 'technician' && "Support clinical excellence"}
            {role === 'receptionist' && "Ensure smooth patient experience"}
          </p>
        </div>
        <Badge variant="secondary" className="text-sm capitalize px-3 py-1">
          {role}
        </Badge>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Role-specific dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaySchedule />
        <PendingTasks />
      </div>

      {/* Role-specific quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {role === 'optometrist' ? 'Patients Today' : 
                   role === 'admin' ? 'Total Staff' :
                   role === 'technician' ? 'Equipment Ready' : 'Check-ins'}
                </p>
                <p className="text-xl font-bold">
                  {role === 'optometrist' ? '8' : 
                   role === 'admin' ? '12' :
                   role === 'technician' ? '95%' : '24'}
                </p>
              </div>
              {role === 'optometrist' && <Eye className="h-6 w-6 text-primary" />}
              {role === 'admin' && <Users className="h-6 w-6 text-primary" />}
              {role === 'technician' && <Stethoscope className="h-6 w-6 text-primary" />}
              {role === 'receptionist' && <Calendar className="h-6 w-6 text-primary" />}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {role === 'optometrist' ? 'Pending Results' : 
                   role === 'admin' ? 'Revenue Today' :
                   role === 'technician' ? 'Tests Complete' : 'Appointments'}
                </p>
                <p className="text-xl font-bold">
                  {role === 'optometrist' ? '3' : 
                   role === 'admin' ? '$2.4k' :
                   role === 'technician' ? '16' : '18'}
                </p>
              </div>
              <Activity className="h-6 w-6 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {role === 'optometrist' ? 'Next Appointment' : 
                   role === 'admin' ? 'Active Users' :
                   role === 'technician' ? 'Calibrations Due' : 'Insurance Pending'}
                </p>
                <p className="text-xl font-bold">
                  {role === 'optometrist' ? '10:00 AM' : 
                   role === 'admin' ? '8/12' :
                   role === 'technician' ? '2' : '5'}
                </p>
              </div>
              <Clock className="h-6 w-6 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {role === 'optometrist' ? 'Prescriptions' : 
                   role === 'admin' ? 'Efficiency Score' :
                   role === 'technician' ? 'Inventory Low' : 'No-shows'}
                </p>
                <p className="text-xl font-bold">
                  {role === 'optometrist' ? '4' : 
                   role === 'admin' ? '92%' :
                   role === 'technician' ? '3 items' : '1'}
                </p>
              </div>
              <FileText className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}