import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, ShoppingBag, Users, Clock, TrendingUp, Package, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export default function AdminHome() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦1,250,000",
      icon: CircleDollarSign,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Orders",
      value: "2,847",
      icon: ShoppingBag,
      trend: "+18.2%",
      trendUp: true,
    },
    {
      title: "Active Customers",
      value: "1,238",
      icon: Users,
      trend: "+23.1%",
      trendUp: true,
    },
    {
      title: "Pending Orders",
      value: "47",
      icon: Clock,
      trend: "-8.3%",
      trendUp: false,
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 85000, orders: 120 },
    { month: 'Feb', revenue: 92000, orders: 135 },
    { month: 'Mar', revenue: 105000, orders: 158 },
    { month: 'Apr', revenue: 118000, orders: 172 },
    { month: 'May', revenue: 125000, orders: 185 },
    { month: 'Jun', revenue: 135000, orders: 198 },
  ];

  const categoryData = [
    { name: 'Masa', value: 45, color: '#F3801D' },
    { name: 'Soups', value: 30, color: '#5C9A2C' },
    { name: 'Meat', value: 15, color: '#8B5A3C' },
    { name: 'Drinks', value: 10, color: '#4A90E2' },
  ];

  const recentOrders = [
    {
      id: "ORD-2025-001",
      customer: "Amina Ibrahim",
      date: "Jun 23, 2025, 2:30 PM",
      amount: "₦4,500",
      status: "pending",
      items: 3,
    },
    {
      id: "ORD-2025-002",
      customer: "Ibrahim Musa",
      date: "Jun 23, 2025, 1:20 PM",
      amount: "₦7,200",
      status: "preparing",
      items: 5,
    },
    {
      id: "ORD-2025-003",
      customer: "Fatima Yusuf",
      date: "Jun 23, 2025, 11:45 AM",
      amount: "₦2,800",
      status: "completed",
      items: 2,
    },
    {
      id: "ORD-2025-004",
      customer: "Mohammed Ali",
      date: "Jun 23, 2025, 10:15 AM",
      amount: "₦6,300",
      status: "completed",
      items: 4,
    },
  ];

  const topProducts = [
    { name: "Plain Masa", sales: 847, revenue: "₦254,100", growth: "+15%" },
    { name: "Miyan Taushe", sales: 632, revenue: "₦632,000", growth: "+28%" },
    { name: "Peppered Chicken", sales: 421, revenue: "₦842,000", growth: "+12%" },
    { name: "Zobo Drink", sales: 318, revenue: "₦318,000", growth: "+8%" },
  ];

  const getOrderStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2 text-sm sm:text-base">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-neutral-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold text-neutral-900">{stat.value}</div>
              <p className={`text-xs flex items-center mt-1 ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                <TrendingUp className={`h-3 w-3 mr-1 ${stat.trendUp ? "" : "rotate-180"}`} />
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#5C9A2C" strokeWidth={3} dot={{ fill: '#5C9A2C', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Recent Orders */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 sm:p-4 border border-neutral-100 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-medium text-neutral-900 text-sm sm:text-base truncate">{order.customer}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getOrderStatusClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">{order.id} • {order.items} items</p>
                    <p className="text-xs text-neutral-400 mt-1">{order.date}</p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-semibold text-neutral-900 text-sm sm:text-base">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 sm:p-4 border border-neutral-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full text-green-600 font-semibold text-xs sm:text-sm">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-neutral-900 text-sm sm:text-base truncate">{product.name}</p>
                      <p className="text-xs sm:text-sm text-neutral-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-semibold text-neutral-900 text-sm sm:text-base">{product.revenue}</p>
                    <p className="text-xs text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">Manage Inventory</p>
                <p className="text-xs sm:text-sm text-neutral-500">Update stock levels</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">Send Bulk Message</p>
                <p className="text-xs sm:text-sm text-neutral-500">Notify customers</p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer sm:col-span-2 lg:col-span-1">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">Low Stock Alert</p>
                <p className="text-xs sm:text-sm text-neutral-500">3 items need restock</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
