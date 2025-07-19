import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  Calendar, 
  FileText, 
  Plus, 
  Clock,
  User,
  Edit,
  Save,
  X
} from "lucide-react";

interface Patient {
  id: number;
  name: string;
  time: string;
  type: string;
  status: string;
  phone: string;
}

const mockPatients: Patient[] = [
  { id: 1, name: "John Smith", time: "09:00 AM", type: "Annual Exam", status: "waiting", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Johnson", time: "10:00 AM", type: "Contact Fitting", status: "scheduled", phone: "(555) 234-5678" },
  { id: 3, name: "Mike Brown", time: "11:30 AM", type: "Follow-up", status: "scheduled", phone: "(555) 345-6789" }
];

export function OptometristActions() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [examNotes, setExamNotes] = useState("");
  const [prescription, setPrescription] = useState("");
  const { toast } = useToast();

  const startExam = (patient: Patient) => {
    setPatients(prev => 
      prev.map(p => 
        p.id === patient.id ? { ...p, status: "in-progress" } : p
      )
    );
    setSelectedPatient(patient);
    toast({
      title: "Examination Started",
      description: `Started examination for ${patient.name}`,
    });
  };

  const completeExam = () => {
    if (!selectedPatient) return;
    
    setPatients(prev => 
      prev.map(p => 
        p.id === selectedPatient.id ? { ...p, status: "completed" } : p
      )
    );
    setSelectedPatient(null);
    setExamNotes("");
    toast({
      title: "Examination Completed",
      description: "Patient examination has been completed and saved.",
    });
  };

  const writePrescription = (patient: Patient) => {
    toast({
      title: "Prescription Created",
      description: `Prescription written for ${patient.name}`,
    });
  };

  const rescheduleAppointment = (patient: Patient) => {
    toast({
      title: "Appointment Rescheduled",
      description: `${patient.name}'s appointment has been rescheduled`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Active Examination */}
      {selectedPatient && (
        <Card className="border-primary shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Active Examination - {selectedPatient.name}
            </CardTitle>
            <CardDescription>
              {selectedPatient.type} • Started at {selectedPatient.time}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Examination Notes</label>
                <Textarea
                  placeholder="Record examination findings..."
                  value={examNotes}
                  onChange={(e) => setExamNotes(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Prescription</label>
                <Textarea
                  placeholder="Enter prescription details..."
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  className="min-h-32"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={completeExam} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Complete Examination
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedPatient(null);
                  setExamNotes("");
                  setPrescription("");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Patient Schedule */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Your Patient Schedule
          </CardTitle>
          <CardDescription>Manage your appointments and start examinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.type}</p>
                      <p className="text-xs text-muted-foreground">{patient.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{patient.time}</span>
                    <Badge 
                      variant={
                        patient.status === 'in-progress' ? 'default' :
                        patient.status === 'completed' ? 'secondary' :
                        patient.status === 'waiting' ? 'outline' : 'outline'
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {patient.status === 'waiting' || patient.status === 'scheduled' ? (
                      <Button 
                        size="sm" 
                        onClick={() => startExam(patient)}
                        disabled={!!selectedPatient}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Start Exam
                      </Button>
                    ) : patient.status === 'completed' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => writePrescription(patient)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Prescription
                      </Button>
                    ) : null}
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Reschedule Appointment</DialogTitle>
                          <DialogDescription>
                            Change appointment time for {patient.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">New Date</label>
                            <Input type="date" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">New Time</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="09:30">9:30 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="10:30">10:30 AM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => rescheduleAppointment(patient)}
                          >
                            Confirm Reschedule
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common optometrist tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Plus className="h-5 w-5" />
              New Patient
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <FileText className="h-5 w-5" />
              View Reports
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              My Schedule
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Eye className="h-5 w-5" />
              Equipment Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}