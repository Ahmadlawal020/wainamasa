import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleDollarSign,
  ShoppingBag,
  Users,
  Clock,
  TrendingUp,
  Package,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetOrdersQuery } from "../../services/api/orderApi";
import { useState, useMemo } from "react";

export default function AdminHome() {
  const { data: orders = [], isLoading } = useGetOrdersQuery();

  // Derived metrics
  const { totalRevenue, totalOrders, pendingOrders, activeCustomers } =
    useMemo(() => {
      const completed = orders.filter((o: any) => o.status === "completed");
      const totalRevenue = completed.reduce(
        (sum: number, o: any) => sum + o.totalPrice,
        0
      );
      const pending = orders.filter((o: any) => o.status === "pending").length;
      const uniquePhones = new Set(
        orders.map((o: any) => o.buyer?.phoneNumber)
      );
      return {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrders: pending,
        activeCustomers: uniquePhones.size,
      };
    }, [orders]);

  const formatCurrency = (n: number) =>
    `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  // Monthly stats for chart
  const monthlyStats = useMemo(() => {
    const stats: Record<string, { revenue: number }> = {};
    orders.forEach((o: any) => {
      const d = new Date(o.createdAt),
        key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      if (!stats[key]) stats[key] = { revenue: 0 };
      if (o.status === "completed") {
        stats[key].revenue += o.totalPrice;
      }
    });
    return Object.entries(stats)
      .map(([k, v]) => {
        const [year, mo] = k.split("-");
        return {
          month: new Date(+year, +mo - 1).toLocaleString("default", {
            month: "short",
          }),
          revenue: v.revenue,
        };
      })
      .sort((a, b) =>
        new Date(`${a.month} 1`) > new Date(`${b.month} 1`) ? 1 : -1
      );
  }, [orders]);

  const trendPercent = useMemo(() => {
    if (monthlyStats.length < 2) return "+0%";
    const L = monthlyStats.length - 1;
    const diff = monthlyStats[L].revenue - monthlyStats[L - 1].revenue;
    const pct = (diff / monthlyStats[L - 1].revenue) * 100;
    return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
  }, [monthlyStats]);

  // Recent orders
  const recentOrders = useMemo(() => {
    return orders
      .slice(-4)
      .reverse()
      .map((o: any) => ({
        id: o._id,
        customer: o.buyer.fullName,
        date: new Date(o.createdAt).toLocaleString("en-NG", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        amount: formatCurrency(o.totalPrice),
        status: o.status,
        items: o.items.length,
      }));
  }, [orders]);

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: CircleDollarSign,
      trend: trendPercent,
      trendUp: trendPercent.startsWith("+"),
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      trend: "+0%",
      trendUp: true,
    },
    {
      title: "Active Customers",
      value: activeCustomers.toString(),
      icon: Users,
      trend: "+0%",
      trendUp: true,
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      icon: Clock,
      trend: "-0%",
      trendUp: false,
    },
  ];

  const getOrderStatusClass = (s: string) => {
    switch (s) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const categoryData = [
    { name: "Masa", value: 45, color: "#F3801D" },
    { name: "Soups", value: 30, color: "#5C9A2C" },
    { name: "Meat", value: 15, color: "#8B5A3C" },
    { name: "Drinks", value: 10, color: "#4A90E2" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Here’s what’s happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title} className="bg-white shadow-sm">
            <CardHeader className="flex justify-between p-4">
              <CardTitle className="text-xs text-neutral-600">
                {s.title}
              </CardTitle>
              <s.icon className="h-5 w-5 text-neutral-400" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-bold text-neutral-900">
                {isLoading ? "…" : s.value}
              </div>
              <p
                className={`text-xs flex items-center mt-1 ${
                  s.trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 mr-1 ${s.trendUp ? "" : "rotate-180"}`}
                />
                {s.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}

      {/* Recent Orders & Top Products */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Recent Orders */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="p-4">
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{o.customer}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs border ${getOrderStatusClass(
                          o.status
                        )}`}
                      >
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {o.id} • {o.items} items
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">{o.date}</p>
                  </div>
                  <div className="text-right font-semibold text-neutral-900">
                    {o.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="p-4">
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {[
                { id: "1", name: "Masa", sales: "₦25,000", orders: 34 },
                { id: "2", name: "Egusi Soup", sales: "₦18,000", orders: 22 },
                { id: "3", name: "Zobo Drink", sales: "₦12,000", orders: 15 },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {item.orders} orders
                    </p>
                  </div>
                  <div className="text-right font-semibold text-neutral-900">
                    {item.sales}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">
                  Manage Inventory
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Update stock levels
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">
                  Send Bulk Message
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Notify customers
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer sm:col-span-2 lg:col-span-1">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-3 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">
                  Low Stock Alert
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  3 items need restock
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions card unchanged */}
    </div>
  );
}
