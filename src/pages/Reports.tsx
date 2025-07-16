import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Download,
  Calendar,
  FileText,
  PieChart,
  Activity,
  Shield
} from "lucide-react";

const reportCategories = [
  {
    id: 1,
    title: "Patient Demographics",
    description: "Age distribution, insurance coverage, and patient statistics",
    icon: Users,
    reports: ["Age Distribution", "Insurance Analysis", "New Patient Trends"],
    lastGenerated: "2024-01-25"
  },
  {
    id: 2,
    title: "Financial Performance",
    description: "Revenue analysis, billing reports, and financial metrics",
    icon: DollarSign,
    reports: ["Monthly Revenue", "Insurance Claims", "Payment Analytics"],
    lastGenerated: "2024-01-24"
  },
  {
    id: 3,
    title: "Clinical Outcomes",
    description: "Treatment effectiveness and patient outcome analysis",
    icon: Activity,
    reports: ["Vision Improvement", "Treatment Success", "Complication Rates"],
    lastGenerated: "2024-01-23"
  },
  {
    id: 4,
    title: "Compliance & Quality",
    description: "HIPAA compliance, audit trails, and quality metrics",
    icon: Shield,
    reports: ["HIPAA Audit", "Quality Metrics", "Compliance Status"],
    lastGenerated: "2024-01-22"
  }
];

const dashboardMetrics = [
  {
    title: "Monthly Revenue",
    value: "$127,450",
    change: "+12.5%",
    period: "vs last month"
  },
  {
    title: "Patient Volume",
    value: "1,247",
    change: "+8.3%",
    period: "active patients"
  },
  {
    title: "Appointment Rate",
    value: "94.2%",
    change: "+2.1%",
    period: "completion rate"
  },
  {
    title: "Insurance Claims",
    value: "98.7%",
    change: "+1.2%",
    period: "approval rate"
  }
];

const recentReports = [
  {
    id: 1,
    name: "Monthly Financial Summary",
    type: "Financial",
    generatedDate: "2024-01-25",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: 2,
    name: "Patient Demographics Analysis",
    type: "Demographics",
    generatedDate: "2024-01-24",
    size: "1.8 MB",
    format: "Excel"
  },
  {
    id: 3,
    name: "HIPAA Compliance Audit",
    type: "Compliance",
    generatedDate: "2024-01-23",
    size: "3.1 MB",
    format: "PDF"
  }
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive clinic performance metrics and compliance reporting</p>
        </div>
        <Button className="shadow-elegant">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-success font-medium">{metric.change}</span>
                  <span className="text-muted-foreground">{metric.period}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category) => (
          <Card key={category.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {category.reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                    <span className="text-sm font-medium">{report}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">
                  Last generated: {category.lastGenerated}
                </span>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Reports
            </CardTitle>
            <CardDescription>Recently generated reports and analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.type} Report</p>
                    </div>
                  </div>
                  <Badge variant="outline">{report.format}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {report.generatedDate}
                    </span>
                    <span className="text-muted-foreground">
                      {report.size}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Analytics */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-accent" />
              Quick Analytics
            </CardTitle>
            <CardDescription>Real-time performance insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Today's Revenue</span>
                <span className="text-sm font-bold">$4,250</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Appointment Fill Rate</span>
                <span className="text-sm font-bold">94%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Insurance Claims</span>
                <span className="text-sm font-bold">98%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              <BarChart3 className="h-4 w-4 mr-2" />
              Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Report Generation Tools
          </CardTitle>
          <CardDescription>Create custom reports and schedule automated analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-5 w-5" />
              Custom Report
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="h-5 w-5" />
              Export Data
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Shield className="h-5 w-5" />
              Compliance Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}