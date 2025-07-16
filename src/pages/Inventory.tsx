import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Plus, 
  Search, 
  AlertTriangle, 
  TrendingUp,
  ShoppingCart,
  Eye,
  Filter,
  Minus
} from "lucide-react";

const inventoryItems = [
  {
    id: 1,
    name: "Designer Frames - Model A",
    category: "Frames",
    stock: 24,
    minStock: 10,
    price: 89.99,
    supplier: "Fashion Frames Co",
    lastRestocked: "2024-01-20"
  },
  {
    id: 2,
    name: "Progressive Lenses",
    category: "Lenses",
    stock: 45,
    minStock: 20,
    price: 149.99,
    supplier: "Optics Plus",
    lastRestocked: "2024-01-18"
  },
  {
    id: 3,
    name: "Contact Lenses - Daily",
    category: "Contacts",
    stock: 8,
    minStock: 15,
    price: 29.99,
    supplier: "Contact Supply Inc",
    lastRestocked: "2024-01-15"
  },
  {
    id: 4,
    name: "Blue Light Filters",
    category: "Accessories",
    stock: 32,
    minStock: 12,
    price: 19.99,
    supplier: "Tech Vision",
    lastRestocked: "2024-01-22"
  }
];

const lowStockItems = [
  { name: "Contact Lenses - Daily", stock: 8, minStock: 15 },
  { name: "Reading Glasses +2.0", stock: 3, minStock: 10 },
  { name: "Lens Cleaning Solution", stock: 5, minStock: 12 }
];

const inventoryStats = {
  totalItems: 1247,
  lowStockItems: 15,
  totalValue: 89450,
  reorderAlerts: 5
};

export default function Inventory() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track eyewear inventory, manage stock levels, and automate reordering</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="shadow-elegant">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{inventoryStats.totalItems.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold">{inventoryStats.lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${inventoryStats.totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reorder Alerts</p>
                <p className="text-2xl font-bold">{inventoryStats.reorderAlerts}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search inventory by name, category, or supplier..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Items */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Inventory Items
            </CardTitle>
            <CardDescription>Current stock levels and item details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category} • {item.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price}</p>
                    <Badge variant={item.stock < item.minStock ? 'destructive' : 'default'}>
                      Stock: {item.stock}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span>Min Stock: {item.minStock}</span>
                    <span className="text-muted-foreground">
                      Last Restocked: {item.lastRestocked}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Minus className="h-4 w-4 mr-1" />
                      Sell
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Restock
                    </Button>
                  </div>
                </div>
                
                {item.stock < item.minStock && (
                  <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-xs text-destructive font-medium">
                      ⚠️ Low stock alert - Consider reordering
                    </p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 bg-warning/5 border-warning/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-destructive font-medium">
                    Stock: {item.stock}
                  </span>
                  <span className="text-muted-foreground">
                    Min: {item.minStock}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Reorder Now
                </Button>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Inventory Actions
          </CardTitle>
          <CardDescription>Common inventory management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add New Item
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ShoppingCart className="h-5 w-5" />
              Bulk Reorder
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Eye className="h-5 w-5" />
              Stock Report
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="h-5 w-5" />
              Set Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}