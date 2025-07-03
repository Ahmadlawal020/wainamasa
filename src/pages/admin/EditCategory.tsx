import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../services/api/categoryApiSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useGetCategoryByIdQuery(id!);

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setIcon(category.icon || "");
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateCategory({ id, name: name.trim(), icon }).unwrap();
      toast({ title: "Success", description: "Category updated successfully" });
      navigate("/admin/settings/categories");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.data?.message || "Failed to update category",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <p className="text-sm text-neutral-500">Loading category...</p>;
  }

  if (isError || !category) {
    return (
      <p className="text-sm text-red-600">
        {error?.data?.message || "Failed to load category"}
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Edit Category</h1>
        <p className="text-neutral-600">Update category details</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Icon (emoji or short text)
              </label>
              <Input
                placeholder="e.g. 📦 or shopping"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-500 hover:bg-brand-600 text-white"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
