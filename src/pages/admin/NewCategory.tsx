import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../services/api/categoryApiSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function NewCategory() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

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
      const res = await createCategory({ name: name.trim(), icon }).unwrap();
      toast({ title: "Success", description: "Category created successfully" });
      navigate("/admin/settings/categories");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.data?.message || "Failed to create category",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Add New Category
        </h1>
        <p className="text-neutral-600">Create a new product category</p>
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
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Category"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
