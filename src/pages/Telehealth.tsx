import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Plus, 
  Calendar, 
  Users,
  Phone,
  Monitor,
  Clock,
  FileText,
  Settings,
  Wifi,
  WifiOff
} from "lucide-react";

const virtualConsultations = [
  {
    id: 1,
    patient: "John Smith",
    date: "2024-01-25",
    time: "02:00 PM",
    type: "Follow-up Consultation",
    status: "scheduled",
    platform: "Secure Video",
    notes: "Post-surgery check-up"
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    date: "2024-01-25",
    time: "03:30 PM",
    type: "Preliminary Assessment",
    status: "in-progress",
    platform: "Secure Video",
    notes: "Initial vision concerns"
  },
  {
    id: 3,
    patient: "Mike Brown",
    date: "2024-01-26",
    time: "10:00 AM",
    type: "Prescription Review",
    status: "scheduled",
    platform: "Secure Video",
    notes: "Annual prescription update"
  }
];

const telehealthFeatures = [
  {
    id: 1,
    title: "Secure Video Conferencing",
    description: "HIPAA-compliant video calls with end-to-end encryption",
    icon: Video,
    status: "active",
    patients: 127
  },
  {
    id: 2,
    title: "File Sharing",
    description: "Secure document and image sharing during consultations",
    icon: FileText,
    status: "active",
    patients: 89
  },
  {
    id: 3,
    title: "Remote Monitoring",
    description: "Track patient progress between visits",
    icon: Monitor,
    status: "active",
    patients: 56
  },
  {
    id: 4,
    title: "Virtual Waiting Room",
    description: "Digital waiting area for patient queue management",
    icon: Clock,
    status: "active",
    patients: 234
  }
];

const connectionStats = {
  onlineNow: 12,
  totalSessions: 89,
  averageSessionTime: "18 min",
  connectionQuality: 98
};

export default function Telehealth() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Telehealth Platform</h1>
          <p className="text-muted-foreground">Virtual consultations, remote monitoring, and secure patient communication</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Platform Settings
          </Button>
          <Button className="shadow-elegant">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Virtual Visit
          </Button>
        </div>
      </div>

      {/* Telehealth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold">{connectionStats.onlineNow}</p>
              </div>
              <Wifi className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Sessions</p>
                <p className="text-2xl font-bold">{connectionStats.totalSessions}</p>
              </div>
              <Video className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Session Time</p>
                <p className="text-2xl font-bold">{connectionStats.averageSessionTime}</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connection Quality</p>
                <p className="text-2xl font-bold">{connectionStats.connectionQuality}%</p>
              </div>
              <Monitor className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Virtual Consultations */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Virtual Consultations
            </CardTitle>
            <CardDescription>Scheduled and ongoing telehealth appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {virtualConsultations.map((consultation) => (
              <div key={consultation.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{consultation.patient}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.type}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={consultation.status === 'in-progress' ? 'default' : 'outline'}
                    className="capitalize"
                  >
                    {consultation.status === 'in-progress' && <Video className="h-3 w-3 mr-1" />}
                    {consultation.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {consultation.date} at {consultation.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      {consultation.platform}
                    </span>
                  </div>
                </div>
                
                {consultation.notes && (
                  <div className="text-sm text-muted-foreground mb-3 p-2 bg-muted/50 rounded">
                    {consultation.notes}
                  </div>
                )}
                
                <div className="flex gap-2">
                  {consultation.status === 'in-progress' ? (
                    <Button size="sm" className="flex-1">
                      <Video className="h-4 w-4 mr-1" />
                      Join Call
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Video className="h-4 w-4 mr-1" />
                      Start Session
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Notes
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform Features */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-accent" />
              Platform Features
            </CardTitle>
            <CardDescription>Available telehealth capabilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {telehealthFeatures.map((feature) => (
              <div key={feature.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                  </div>
                  <Badge variant={feature.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Active users:</span>
                  <span className="font-medium">{feature.patients}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Connection Status */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-success" />
            Connection & Quality Status
          </CardTitle>
          <CardDescription>Real-time platform performance and connectivity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Wifi className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold text-lg">Platform Status</h3>
              <p className="text-sm text-muted-foreground">All systems operational</p>
              <Badge variant="default" className="mt-2">Stable</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Video Quality</h3>
              <p className="text-sm text-muted-foreground">HD streaming available</p>
              <Badge variant="default" className="mt-2">Excellent</Badge>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Phone className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Audio Quality</h3>
              <p className="text-sm text-muted-foreground">Crystal clear audio</p>
              <Badge variant="default" className="mt-2">Optimal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" />
            Telehealth Tools
          </CardTitle>
          <CardDescription>Quick access to virtual care management features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Schedule Visit
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Video className="h-5 w-5" />
              Start Instant Call
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-5 w-5" />
              Virtual Records
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-5 w-5" />
              Platform Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}