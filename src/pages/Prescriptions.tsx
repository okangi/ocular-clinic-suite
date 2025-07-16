import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Printer, 
  Send, 
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Glasses
} from "lucide-react";

const prescriptions = [
  {
    id: 1,
    patient: "John Smith",
    date: "2024-01-25",
    type: "Eyeglasses",
    od: "-2.50 -0.75 x 180",
    os: "-2.25 -0.50 x 175",
    status: "active",
    expires: "2025-01-25",
    pharmacy: "LensCrafters"
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    date: "2024-01-24",
    type: "Contact Lenses",
    od: "-3.00",
    os: "-3.25",
    status: "pending",
    expires: "2025-01-24",
    pharmacy: "Pearl Vision"
  },
  {
    id: 3,
    patient: "Mike Brown",
    date: "2024-01-20",
    type: "Eyeglasses",
    od: "+1.25",
    os: "+1.50",
    status: "filled",
    expires: "2025-01-20",
    pharmacy: "Warby Parker"
  }
];

const expiringPrescriptions = [
  { patient: "Emma Wilson", expires: "2024-02-01", type: "Contact Lenses" },
  { patient: "David Lee", expires: "2024-02-03", type: "Eyeglasses" },
  { patient: "Lisa Chen", expires: "2024-02-05", type: "Bifocals" }
];

const prescriptionStats = {
  totalActive: 342,
  expiringThisMonth: 23,
  pendingFill: 8,
  averageProcessingTime: "24 hours"
};

export default function Prescriptions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Prescription Management</h1>
          <p className="text-muted-foreground">Generate, track, and manage eyeglass and contact lens prescriptions</p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Prescription Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Prescriptions</p>
                <p className="text-2xl font-bold">{prescriptionStats.totalActive}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expiring This Month</p>
                <p className="text-2xl font-bold">{prescriptionStats.expiringThisMonth}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Fill</p>
                <p className="text-2xl font-bold">{prescriptionStats.pendingFill}</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing</p>
                <p className="text-2xl font-bold">{prescriptionStats.averageProcessingTime}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Prescriptions */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Prescriptions
            </CardTitle>
            <CardDescription>Latest prescription orders and status updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Glasses className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{prescription.patient}</h3>
                      <p className="text-sm text-muted-foreground">{prescription.type}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      prescription.status === 'active' ? 'default' :
                      prescription.status === 'pending' ? 'secondary' : 'outline'
                    }
                    className="capitalize"
                  >
                    {prescription.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">OD (Right Eye)</p>
                    <p className="text-sm font-mono">{prescription.od}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">OS (Left Eye)</p>
                    <p className="text-sm font-mono">{prescription.os}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {prescription.date}
                    </span>
                    <span className="text-muted-foreground">
                      Expires: {prescription.expires}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4 mr-1" />
                      E-Prescribe
                    </Button>
                  </div>
                </div>
                
                {prescription.pharmacy && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Pharmacy: {prescription.pharmacy}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expiring Prescriptions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Expiring Soon
            </CardTitle>
            <CardDescription>Prescriptions requiring renewal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringPrescriptions.map((prescription, index) => (
              <div key={index} className="border rounded-lg p-3 bg-warning/5 border-warning/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{prescription.patient}</h4>
                  <Badge variant="outline" className="text-xs">
                    {prescription.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Expires: {prescription.expires}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Schedule Renewal
                </Button>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View All Expiring
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Prescription Tools */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-accent" />
            Prescription Tools & Actions
          </CardTitle>
          <CardDescription>Quick access to prescription management features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              New Prescription
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Printer className="h-5 w-5" />
              Bulk Print
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Send className="h-5 w-5" />
              E-Prescribe Portal
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Renewal Reminders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}