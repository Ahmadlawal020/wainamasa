// pages/AdminOrders.tsx
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, PackageCheck, Ban } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetOrdersQuery } from "../../services/api/orderApi";

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch completed and cancelled orders
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery({}); // Could also use separate queries for completed & cancelled

  const filteredOrders = orders.filter(
    (order) =>
      (order.status === "completed" || order.status === "cancelled") &&
      order.buyer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = orders.filter((o) => o.status === "completed").length;
  const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="gap-1 bg-green-100 text-green-800 border-green-200"
          >
            <PackageCheck className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="destructive"
            className="gap-1 bg-red-100 text-red-800 border-red-200"
          >
            <Ban className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Order History</h1>
          <p className="text-neutral-600">Completed & Cancelled Orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex items-center">
            <PackageCheck className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">
                Completed Orders
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                {completedCount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex items-center">
            <Ban className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">
                Cancelled Orders
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                {cancelledCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Order Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-neutral-500">Loading orders...</p>
          ) : isError ? (
            <p className="text-sm text-red-600">Failed to load orders.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.buyer.fullName}</TableCell>
                    <TableCell>{order.buyer.phoneNumber}</TableCell>
                    <TableCell>{order.buyer.emailAddress}</TableCell>
                    <TableCell>₦{order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
