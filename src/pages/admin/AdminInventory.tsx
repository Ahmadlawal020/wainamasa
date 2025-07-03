import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../services/api/productsApiSlice";

export default function AdminInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data: inventoryItems = [],
    isLoading,
    isError,
  } = useGetProductsQuery();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const getStatusBadge = (currentStock: number, minStock: number) => {
    if (currentStock <= minStock * 0.3) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Critical
        </Badge>
      );
    } else if (currentStock <= minStock) {
      return (
        <Badge
          variant="secondary"
          className="gap-1 bg-yellow-100 text-yellow-800 border-yellow-200"
        >
          <TrendingDown className="h-3 w-3" />
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="secondary"
          className="gap-1 bg-green-100 text-green-800 border-green-200"
        >
          <TrendingUp className="h-3 w-3" />
          In Stock
        </Badge>
      );
    }
  };

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => navigate("/admin/inventory/newproduct");

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct({ id }).unwrap();
      toast({
        title: "Product deleted",
        description: "The product has been removed from inventory.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(
    (item) => item.stock <= item.minStock
  ).length;
  const criticalItems = inventoryItems.filter(
    (item) => item.stock <= item.minStock * 0.3
  ).length;
  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + item.stock * item.price,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Inventory Management
          </h1>
          <p className="text-neutral-600">Track and manage your stock levels</p>
        </div>
        <Button
          className="bg-brand-500 hover:bg-brand-600 text-white"
          onClick={handleSubmit}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total, Low, Critical, Value Cards (unchanged) */}
        {/* ... (same as your code) */}
      </div>

      {/* Search & Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-neutral-500">Loading inventory...</p>
          ) : isError ? (
            <p className="text-sm text-red-600">Failed to load inventory.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Min Stock</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.product}
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.minStock ?? 10}</TableCell>
                    <TableCell>₦{item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      {getStatusBadge(item.stock, item.minStock ?? 10)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/inventory/editproduct/${item._id}`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
