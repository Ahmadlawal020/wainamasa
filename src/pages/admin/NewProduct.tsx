// import { useState, useRef, ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUpdateProductMutation } from "../../services/api/productsApiSlice";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Plus, X, Upload } from "lucide-react";
// import { toast } from "sonner";

// export default function AddNewProduct() {
//   const navigate = useNavigate();
//   const [addProduct, { isLoading }] = useUpdateProductMutation();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [formData, setFormData] = useState({
//     product: "",
//     stock: 0,
//     minStock: 5,
//     category: "",
//     price: 0,
//     description: "",
//     status: "instock",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const categories = [
//     "Electronics",
//     "Clothing",
//     "Food",
//     "Furniture",
//     "Books",
//     "Other",
//   ];
//   const statuses = ["instock", "low stock", "critical"];

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: ["stock", "price", "minStock"].includes(name)
//         ? Number(value)
//         : value,
//     });
//   };

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       if (!file.type.match("image.*")) {
//         toast.error("Please select an image file");
//         return;
//       }

//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("Image size should be less than 2MB");
//         return;
//       }

//       setImageFile(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile) {
//       toast.error("Please select an image for the product");
//       return;
//     }

//     try {
//       // Step 1: Upload image to Cloudinary
//       const formDataUpload = new FormData();
//       formDataUpload.append("file", imageFile);
//       formDataUpload.append("upload_preset", "images_preset"); // 🔁 Replace with your Cloudinary preset

//       const cloudinaryResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/djpyy3s9u/image/upload", // 🔁 Replace with your Cloudinary cloud name
//         {
//           method: "POST",
//           body: formDataUpload,
//         }
//       );

//       if (!cloudinaryResponse.ok) {
//         throw new Error("Image upload failed");
//       }

//       const data = await cloudinaryResponse.json();
//       const imageUrl = data.secure_url;

//       console.log(imageUrl);

//       // Step 2: Send to backend
//       const productData = {
//         ...formData,
//         image: imageUrl,
//       };

//       await addProduct(productData).unwrap();
//       toast.success("Product added successfully");
//       navigate("/admin/inventory");
//     } catch (error) {
//       toast.error("Failed to add product");
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-neutral-900">
//             Add New Product
//           </h1>
//           <p className="text-neutral-600">
//             Fill in the details for the new inventory item
//           </p>
//         </div>
//         <Button variant="outline" onClick={() => navigate("/admin/inventory")}>
//           Back to Inventory
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid gap-6 md:grid-cols-3">
//           <div className="space-y-6 md:col-span-2">
//             {/* Product Info */}
//             <Card className="border-0 shadow-sm">
//               <CardHeader>
//                 <CardTitle>Product Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="product">Product Name</Label>
//                   <Input
//                     id="product"
//                     name="product"
//                     placeholder="Enter product name"
//                     value={formData.product}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="category">Category</Label>
//                   <Select
//                     value={formData.category}
//                     onValueChange={(value) =>
//                       setFormData({ ...formData, category: value })
//                     }
//                     required
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem key={category} value={category}>
//                           {category}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     placeholder="Enter product description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     rows={4}
//                     required
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Inventory Details */}
//             <Card className="border-0 shadow-sm">
//               <CardHeader>
//                 <CardTitle>Inventory Details</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="stock">Current Stock</Label>
//                     <Input
//                       id="stock"
//                       name="stock"
//                       type="number"
//                       min="0"
//                       value={formData.stock}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="minStock">Minimum Stock Level</Label>
//                     <Input
//                       id="minStock"
//                       name="minStock"
//                       type="number"
//                       min="1"
//                       value={formData.minStock}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="price">Unit Price (₦)</Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="status">Stock Status</Label>
//                   <Select
//                     value={formData.status}
//                     onValueChange={(value) =>
//                       setFormData({ ...formData, status: value })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select stock status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {statuses.map((status) => (
//                         <SelectItem key={status} value={status}>
//                           {status}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Image Upload */}
//           <div className="space-y-6">
//             <Card className="border-0 shadow-sm">
//               <CardHeader>
//                 <CardTitle>Product Image</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img
//                         src={imagePreview}
//                         alt="Product preview"
//                         className="w-full h-64 object-contain rounded-md border border-neutral-200"
//                       />
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="absolute top-2 right-2 bg-white/80 hover:bg-white"
//                         onClick={handleRemoveImage}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <div
//                       className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-neutral-300 rounded-md bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       <Upload className="h-10 w-10 text-neutral-400 mb-2" />
//                       <p className="text-neutral-500 text-sm">
//                         Click to upload or drag and drop
//                       </p>
//                       <p className="text-neutral-400 text-xs mt-1">
//                         PNG, JPG up to 2MB
//                       </p>
//                     </div>
//                   )}

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="hidden"
//                     required={!imagePreview}
//                   />

//                   {!imagePreview && (
//                     <Button
//                       type="button"
//                       variant="outline"
//                       className="w-full"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       <Upload className="h-4 w-4 mr-2" />
//                       Select Image
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Submit Button */}
//             <Card className="border-0 shadow-sm">
//               <CardHeader>
//                 <CardTitle>Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Button
//                   type="submit"
//                   className="w-full bg-brand-500 hover:bg-brand-600"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     "Saving..."
//                   ) : (
//                     <>
//                       <Plus className="h-4 w-4 mr-2" />
//                       Add Product
//                     </>
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

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
import { Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";

export default function AddNewProduct() {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    product: "",
    stock: 0,
    minStock: 5,
    category: "",
    price: 0,
    description: "",
    status: "instock",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = ["masa", "meat", "soups", "drinks", "extras"];
  // "All Items",

  const statuses = ["instock", "low stock", "critical"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["stock", "price", "minStock"].includes(name)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image for the product");
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", imageFile);
      formDataUpload.append("upload_preset", "images_preset"); // 🔁 Replace with your actual Cloudinary preset

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/djpyy3s9u/image/upload", // 🔁 Replace with your actual Cloudinary cloud name
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Add New Product
          </h1>
          <p className="text-neutral-600">
            Fill in the details for the new inventory item
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/inventory")}>
          Back to Inventory
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {/* Product Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product Name</Label>
                  <Input
                    id="product"
                    name="product"
                    placeholder="Enter product name"
                    value={formData.product}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          className=" capitalize"
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Inventory Details */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Inventory Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Current Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Minimum Stock Level</Label>
                    <Input
                      id="minStock"
                      name="minStock"
                      type="number"
                      min="1"
                      value={formData.minStock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Unit Price (₦)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Stock Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stock status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-64 object-contain rounded-md border border-neutral-200"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-neutral-300 rounded-md bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-10 w-10 text-neutral-400 mb-2" />
                      <p className="text-neutral-500 text-sm">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    required={!imagePreview}
                  />

                  {!imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
