import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Plus, 
  Stethoscope, 
  Activity, 
  FileText,
  Camera,
  Thermometer,
  Gauge,
  Target,
  Zap
} from "lucide-react";

const examinationTools = [
  {
    id: 1,
    name: "Visual Acuity Test",
    description: "Digital Snellen chart and vision testing",
    icon: Eye,
    status: "available",
    lastCalibrated: "2024-01-20"
  },
  {
    id: 2,
    name: "Autorefractor",
    description: "Automated refractive measurement",
    icon: Target,
    status: "in-use",
    lastCalibrated: "2024-01-18"
  },
  {
    id: 3,
    name: "Tonometer",
    description: "Intraocular pressure measurement",
    icon: Gauge,
    status: "available",
    lastCalibrated: "2024-01-22"
  },
  {
    id: 4,
    name: "Fundus Camera",
    description: "Retinal imaging and documentation",
    icon: Camera,
    status: "maintenance",
    lastCalibrated: "2024-01-15"
  }
];

const examTemplates = [
  {
    id: 1,
    name: "Comprehensive Eye Exam",
    duration: "45 minutes",
    tests: ["Visual Acuity", "Refraction", "Tonometry", "Fundoscopy"],
    frequency: "Annual"
  },
  {
    id: 2,
    name: "Contact Lens Fitting",
    duration: "30 minutes",
    tests: ["Corneal Mapping", "Tear Film Assessment", "Lens Trial"],
    frequency: "As needed"
  },
  {
    id: 3,
    name: "Glaucoma Screening",
    duration: "20 minutes",
    tests: ["Tonometry", "Visual Field", "Optic Nerve Assessment"],
    frequency: "Annual"
  },
  {
    id: 4,
    name: "Diabetic Eye Exam",
    duration: "30 minutes",
    tests: ["Dilated Fundoscopy", "OCT", "Fluorescein Angiography"],
    frequency: "Semi-annual"
  }
];

const recentExams = [
  {
    id: 1,
    patient: "John Smith",
    type: "Comprehensive Eye Exam",
    date: "2024-01-25",
    time: "09:00 AM",
    status: "completed",
    findings: "Mild myopia progression"
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    type: "Contact Lens Fitting",
    date: "2024-01-25",
    time: "10:00 AM",
    status: "in-progress",
    findings: "Ongoing assessment"
  },
  {
    id: 3,
    patient: "Mike Brown",
    type: "Follow-up",
    date: "2024-01-24",
    time: "03:00 PM",
    status: "completed",
    findings: "Stable prescription"
  }
];

export default function Examinations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Eye Examination Tools</h1>
          <p className="text-muted-foreground">Digital charting, diagnostic equipment integration, and exam templates</p>
        </div>
        <Button className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Start New Exam
        </Button>
      </div>

      {/* Exam Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Exams Today</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Equipment Status</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Exam Time</p>
                <p className="text-2xl font-bold">28m</p>
              </div>
              <Thermometer className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Results</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <FileText className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnostic Equipment */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Diagnostic Equipment
            </CardTitle>
            <CardDescription>Equipment status and calibration information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {examinationTools.map((tool) => (
              <div key={tool.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <tool.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      tool.status === 'available' ? 'default' :
                      tool.status === 'in-use' ? 'secondary' : 'destructive'
                    }
                    className="capitalize"
                  >
                    {tool.status === 'available' && <Zap className="h-3 w-3 mr-1" />}
                    {tool.status === 'in-use' && <Activity className="h-3 w-3 mr-1" />}
                    {tool.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Last calibrated: {tool.lastCalibrated}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exam Templates */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Examination Templates
            </CardTitle>
            <CardDescription>Standardized exam protocols and procedures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {examTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">Duration: {template.duration}</p>
                  </div>
                  <Badge variant="outline">{template.frequency}</Badge>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {template.tests.map((test, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {test}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Examinations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Recent Examinations
          </CardTitle>
          <CardDescription>Latest patient examinations and findings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{exam.patient}</h3>
                      <p className="text-sm text-muted-foreground">{exam.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <p className="font-medium">{exam.date}</p>
                      <p className="text-muted-foreground">{exam.time}</p>
                    </div>
                    <Badge variant={exam.status === 'completed' ? 'default' : 'secondary'}>
                      {exam.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                </div>
                
                {exam.findings && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Findings: </span>
                      {exam.findings}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}