import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Plus, 
  Search, 
  Users as UsersIcon, 
  UserCheck,
  Lock,
  Activity,
  Settings,
  Eye,
  AlertTriangle
} from "lucide-react";

const userRoles = [
  {
    role: "Optometrist",
    permissions: ["Full Access", "Patient Records", "Prescriptions", "Examinations"],
    count: 3,
    color: "bg-primary"
  },
  {
    role: "Technician",
    permissions: ["Equipment Access", "Basic Patient Info", "Exam Assistance"],
    count: 5,
    color: "bg-accent"
  },
  {
    role: "Receptionist",
    permissions: ["Appointment Scheduling", "Patient Check-in", "Basic Info"],
    count: 4,
    color: "bg-success"
  },
  {
    role: "Administrator",
    permissions: ["Full System Access", "User Management", "Reports", "Settings"],
    count: 2,
    color: "bg-warning"
  }
];

const systemUsers = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@clinic.com",
    role: "Optometrist",
    status: "active",
    lastLogin: "2024-01-25 09:15 AM",
    permissions: "Full Access"
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@clinic.com",
    role: "Technician",
    status: "active",
    lastLogin: "2024-01-25 08:30 AM",
    permissions: "Equipment & Basic Records"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@clinic.com",
    role: "Receptionist",
    status: "active",
    lastLogin: "2024-01-25 07:45 AM",
    permissions: "Scheduling & Check-in"
  },
  {
    id: 4,
    name: "Robert Brown",
    email: "robert.brown@clinic.com",
    role: "Administrator",
    status: "active",
    lastLogin: "2024-01-24 06:20 PM",
    permissions: "System Administration"
  },
  {
    id: 5,
    name: "Lisa Chen",
    email: "lisa.chen@clinic.com",
    role: "Technician",
    status: "inactive",
    lastLogin: "2024-01-20 02:15 PM",
    permissions: "Equipment & Basic Records"
  }
];

const securityMetrics = {
  activeUsers: 14,
  failedLogins: 3,
  lastAudit: "2024-01-20",
  complianceScore: 98
};

export default function Users() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, roles, permissions, and security settings</p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{securityMetrics.activeUsers}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed Logins</p>
                <p className="text-2xl font-bold">{securityMetrics.failedLogins}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Audit</p>
                <p className="text-2xl font-bold">{securityMetrics.lastAudit}</p>
              </div>
              <Shield className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold">{securityMetrics.complianceScore}%</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Roles */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            User Roles & Permissions
          </CardTitle>
          <CardDescription>Role-based access control and permission management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userRoles.map((role, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{role.role}</h3>
                  <div className={`h-8 w-8 rounded-full ${role.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {role.count}
                  </div>
                </div>
                <div className="space-y-2">
                  {role.permissions.map((permission, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                      {permission}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Settings className="h-3 w-3 mr-1" />
                  Manage Role
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search users by name, email, or role..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-primary" />
            System Users
          </CardTitle>
          <CardDescription>Manage user accounts and access permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <p className="font-medium">{user.role}</p>
                      <p className="text-muted-foreground">{user.permissions}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p className="text-muted-foreground">Last login:</p>
                      <p className="font-medium">{user.lastLogin}</p>
                    </div>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-1" />
                      Permissions
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Security & Compliance Tools
          </CardTitle>
          <CardDescription>User management and security administration features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add User
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Shield className="h-5 w-5" />
              Security Audit
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Lock className="h-5 w-5" />
              Reset Passwords
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="h-5 w-5" />
              Access Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}