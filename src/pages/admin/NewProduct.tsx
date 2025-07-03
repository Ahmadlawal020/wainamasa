import { useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../services/api/productsApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddNewProduct() {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    product: "",
    stock: 0,
    minStock: 5,
    minOrder: 1,
    category: "",
    price: 0,
    description: "",
    status: "instock",
  });

  const [packages, setPackages] = useState([{ name: "", quantity: 0 }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = ["masa", "meat", "soups", "drinks", "extras"];
  const statuses = ["instock", "low stock", "critical"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["stock", "price", "minStock", "minOrder"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match("image.*")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePackageChange = (
    index: number,
    field: "name" | "quantity",
    value: string | number
  ) => {
    const updated = [...packages];
    updated[index][field] = field === "quantity" ? Number(value) : value;
    setPackages(updated);
  };

  const handleAddPackage = () => {
    setPackages([...packages, { name: "", quantity: 0 }]);
  };

  const handleRemovePackage = (index: number) => {
    const updated = packages.filter((_, i) => i !== index);
    setPackages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image for the product");
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", imageFile);
      formDataUpload.append("upload_preset", "images_preset");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/djpyy3s9u/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Image upload failed");
      }

      const data = await cloudinaryResponse.json();
      const imageUrl = data.secure_url;

      const productData = {
        ...formData,
        image: imageUrl,
        packages,
      };

      await createProduct(productData).unwrap();
      toast.success("Product added successfully");
      navigate("/admin/inventory");
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-sm text-gray-600">
            Fill in the product details below.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/inventory")}>
          Back to Inventory
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-6 md:col-span-2">
          {/* Product Info */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory & Price */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Inventory & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  min={0}
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Minimum Stock</Label>
                <Input
                  type="number"
                  name="minStock"
                  min={0}
                  value={formData.minStock}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Price (₦)</Label>
                <Input
                  type="number"
                  name="price"
                  min={0}
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Minimum Order</Label>
                <Input
                  type="number"
                  name="minOrder"
                  min={1}
                  value={formData.minOrder}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Packages */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Package Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 items-center"
                >
                  <Input
                    placeholder="Package name"
                    value={pkg.name}
                    onChange={(e) =>
                      handlePackageChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    min={1}
                    value={pkg.quantity}
                    onChange={(e) =>
                      handlePackageChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePackage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPackage}
              >
                Add Package
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Image Upload + Submit */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain border rounded"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-48 flex flex-col justify-center items-center border border-dashed rounded cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-gray-500" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Submit</CardTitle>
            </CardHeader>
            <CardContent>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Add Product"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
