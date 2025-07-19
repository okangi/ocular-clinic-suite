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
import { ReceptionistActions } from "./ReceptionistActions";

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

  const userRole = profile.role;

  // If receptionist, show specialized interface
  if (userRole === 'receptionist') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Welcome, {profile.first_name}
            </h1>
            <p className="text-muted-foreground">
              Manage patient registration and appointments
            </p>
          </div>
          <Badge variant="secondary" className="text-sm capitalize px-3 py-1">
            {userRole}
          </Badge>
        </div>
        <ReceptionistActions />
      </div>
    );
  }

  const getQuickActionsConfig = () => {
    switch (userRole) {
      case 'optometrist':
        return {
          title: "Start examinations and manage patient care",
          actions: [
            { icon: Eye, label: "Start Exam", action: () => navigate("/examinations"), color: "bg-primary/10 text-primary" },
            { icon: FileText, label: "Write Prescription", action: () => navigate("/prescriptions"), color: "bg-accent/10 text-accent" },
            { icon: Calendar, label: "View Schedule", action: () => navigate("/appointments"), color: "bg-success/10 text-success" },
            { icon: User, label: "Patient Records", action: () => navigate("/patients"), color: "bg-warning/10 text-warning" }
          ]
        };
      case 'admin':
        return {
          title: "Manage clinic operations and staff",
          actions: [
            { icon: Users, label: "Manage Users", action: () => navigate("/users"), color: "bg-primary/10 text-primary" },
            { icon: Activity, label: "View Reports", action: () => navigate("/reports"), color: "bg-accent/10 text-accent" },
            { icon: Calendar, label: "Clinic Schedule", action: () => navigate("/appointments"), color: "bg-success/10 text-success" },
            { icon: FileText, label: "Analytics", action: () => navigate("/reports"), color: "bg-warning/10 text-warning" }
          ]
        };
      case 'technician':
        return {
          title: "Prepare equipment and assist with procedures",
          actions: [
            { icon: Stethoscope, label: "Equipment Check", action: () => navigate("/examinations"), color: "bg-primary/10 text-primary" },
            { icon: Calendar, label: "Patient Prep", action: () => navigate("/appointments"), color: "bg-accent/10 text-accent" },
            { icon: User, label: "Patient Records", action: () => navigate("/patients"), color: "bg-success/10 text-success" },
            { icon: FileText, label: "Test Results", action: () => navigate("/examinations"), color: "bg-warning/10 text-warning" }
          ]
        };
      default:
        return {
          title: "General actions",
          actions: []
        };
    }
  };

  const getTodayScheduleTitle = () => {
    switch (userRole) {
      case 'optometrist': return "Your patient appointments";
      case 'admin': return "Clinic overview";
      case 'technician': return "Preparation schedule";
      default: return "Schedule overview";
    }
  };

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'optometrist': return "Ready to provide exceptional eye care";
      case 'admin': return "Manage your clinic operations";
      case 'technician': return "Support clinical excellence";
      default: return "Welcome to the clinic system";
    }
  };

  const getStatsConfig = () => {
    switch (userRole) {
      case 'optometrist':
        return [
          { label: 'Patients Today', value: '8', icon: Eye },
          { label: 'Pending Results', value: '3', icon: Activity },
          { label: 'Next Appointment', value: '10:00 AM', icon: Clock },
          { label: 'Prescriptions', value: '4', icon: FileText }
        ];
      case 'admin':
        return [
          { label: 'Total Staff', value: '12', icon: Users },
          { label: 'Revenue Today', value: '$2.4k', icon: Activity },
          { label: 'Active Users', value: '8/12', icon: Clock },
          { label: 'Efficiency Score', value: '92%', icon: FileText }
        ];
      case 'technician':
        return [
          { label: 'Equipment Ready', value: '95%', icon: Stethoscope },
          { label: 'Tests Complete', value: '16', icon: Activity },
          { label: 'Calibrations Due', value: '2', icon: Clock },
          { label: 'Inventory Low', value: '3 items', icon: FileText }
        ];
      default:
        return [
          { label: 'General', value: '0', icon: Activity },
          { label: 'Tasks', value: '0', icon: Activity },
          { label: 'Status', value: 'OK', icon: Clock },
          { label: 'Items', value: '0', icon: FileText }
        ];
    }
  };

  const quickActionsConfig = getQuickActionsConfig();
  const statsConfig = getStatsConfig();

  const QuickActions = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>{quickActionsConfig.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActionsConfig.actions.map((action, index) => (
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

  const TodaySchedule = () => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Today's Schedule
        </CardTitle>
        <CardDescription>{getTodayScheduleTitle()}</CardDescription>
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
          <p className="text-muted-foreground">{getWelcomeMessage()}</p>
        </div>
        <Badge variant="secondary" className="text-sm capitalize px-3 py-1">
          {userRole}
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
        {statsConfig.map((stat, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-6 w-6 ${
                  index === 0 ? 'text-primary' :
                  index === 1 ? 'text-accent' :
                  index === 2 ? 'text-success' : 'text-warning'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}