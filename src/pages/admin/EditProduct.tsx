// import { useState, useRef, ChangeEvent, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetProductByIdQuery,
//   useUpdateProductMutation,
// } from "../../services/api/productsApiSlice";
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
// import { Plus, X, Upload, Save } from "lucide-react";
// import { toast } from "sonner";

// export default function EditProduct() {
//   const { productId } = useParams<{ productId: string }>();
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     data: product,
//     isLoading: isProductLoading,
//     isError,
//     error,
//   } = useGetProductByIdQuery(productId!);

//   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

//   const [formData, setFormData] = useState({
//     product: "",
//     stock: 0,
//     minStock: 1,
//     category: "",
//     price: 0,
//     description: "",
//     status: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [existingImage, setExistingImage] = useState<string | null>(null);

//   const categories = ["masa", "meat", "soups", "drinks", "extras"];
//   const statuses = ["instock", "low stock", "critical"];

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         product: product.product,
//         stock: product.stock,
//         minStock: product.minStock,
//         category: product.category,
//         price: product.price,
//         description: product.description,
//         status: product.status,
//       });

//       if (product.image) {
//         setExistingImage(product.image);
//       }
//     }
//   }, [product]);

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
//       setExistingImage(null);

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
//     setExistingImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       let imageUrl = existingImage;

//       if (imageFile) {
//         const formDataUpload = new FormData();
//         formDataUpload.append("file", imageFile);
//         formDataUpload.append("upload_preset", "images_preset");

//         const cloudinaryResponse = await fetch(
//           "https://api.cloudinary.com/v1_1/djpyy3s9u/image/upload",
//           {
//             method: "POST",
//             body: formDataUpload,
//           }
//         );

//         if (!cloudinaryResponse.ok) {
//           throw new Error("Image upload failed");
//         }

//         const data = await cloudinaryResponse.json();
//         imageUrl = data.secure_url;
//       }

//       const productData = {
//         ...formData,
//         id: productId!,
//         image: imageUrl || "",
//       };

//       await updateProduct(productData).unwrap();
//       toast.success("Product updated successfully");
//       navigate("/admin/inventory");
//     } catch (error) {
//       toast.error("Failed to update product");
//       console.error("Error updating product:", error);
//     }
//   };

//   if (isProductLoading) {
//     return <div>Loading product data...</div>;
//   }

//   if (isError || !product) {
//     return (
//       <div className="text-red-500 p-4">
//         {error?.data?.message || "Failed to fetch product"}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-neutral-900">Edit Product</h1>
//           <p className="text-neutral-600">
//             Update the details for this inventory item
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
//                   >
//                     <SelectTrigger>
//                       <SelectValue>
//                         {formData.category || "Select a category"}
//                       </SelectValue>
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
//                       <SelectValue>
//                         {formData.status || "Select stock status"}
//                       </SelectValue>
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
//                   {imagePreview || existingImage ? (
//                     <div className="relative">
//                       <img
//                         src={imagePreview || existingImage!}
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
//                   />

//                   {!imagePreview && !existingImage && (
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
//                   disabled={isUpdating}
//                 >
//                   {isUpdating ? (
//                     "Saving..."
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4 mr-2" />
//                       Update Product
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

// import { useState, useRef, ChangeEvent, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetProductByIdQuery,
//   useUpdateProductMutation,
// } from "../../services/api/productsApiSlice";
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
// import { Upload, X, Save, Trash2 } from "lucide-react";
// import { toast } from "sonner";

// export default function EditProduct() {
//   const { productId } = useParams<{ productId: string }>();
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     data: product,
//     isLoading: isProductLoading,
//     isError,
//     error,
//   } = useGetProductByIdQuery(productId!);

//   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

//   const [formData, setFormData] = useState({
//     product: "",
//     stock: 0,
//     minStock: 1,
//     minOrder: 1,
//     category: "",
//     price: 0,
//     description: "",
//     status: "",
//   });

//   const [packages, setPackages] = useState([{ name: "", quantity: 0 }]);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [existingImage, setExistingImage] = useState<string | null>(null);

//   const categories = ["masa", "meat", "soups", "drinks", "extras"];
//   const statuses = ["instock", "low stock", "critical"];

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         product: product.product,
//         stock: product.stock,
//         minStock: product.minStock,
//         minOrder: product.minOrder ?? 1,
//         category: product.category,
//         price: product.price,
//         description: product.description,
//         status: product.status,
//       });

//       if (product.image) setExistingImage(product.image);
//       if (product.packages) setPackages(product.packages);
//     }
//   }, [product]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: ["stock", "price", "minStock", "minOrder"].includes(name)
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
//       setExistingImage(null);

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
//     setExistingImage(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handlePackageChange = (
//     index: number,
//     field: "name" | "quantity",
//     value: string | number
//   ) => {
//     const updated = [...packages];
//     updated[index][field] = field === "quantity" ? Number(value) : value;
//     setPackages(updated);
//   };

//   const handleAddPackage = () => {
//     setPackages([...packages, { name: "", quantity: 0 }]);
//   };

//   const handleRemovePackage = (index: number) => {
//     const updated = packages.filter((_, i) => i !== index);
//     setPackages(updated);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       let imageUrl = existingImage;

//       if (imageFile) {
//         const formDataUpload = new FormData();
//         formDataUpload.append("file", imageFile);
//         formDataUpload.append("upload_preset", "images_preset");

//         const cloudinaryResponse = await fetch(
//           "https://api.cloudinary.com/v1_1/djpyy3s9u/image/upload",
//           {
//             method: "POST",
//             body: formDataUpload,
//           }
//         );

//         if (!cloudinaryResponse.ok) {
//           throw new Error("Image upload failed");
//         }

//         const data = await cloudinaryResponse.json();
//         imageUrl = data.secure_url;
//       }

//       const updatedData = {
//         ...formData,
//         id: productId!,
//         image: imageUrl || "",
//         packages,
//       };

//       await updateProduct(updatedData).unwrap();
//       toast.success("Product updated successfully");
//       navigate("/admin/inventory");
//     } catch (error) {
//       toast.error("Failed to update product");
//       console.error("Error updating product:", error);
//     }
//   };

//   if (isProductLoading) return <div>Loading product data...</div>;
//   if (isError || !product)
//     return (
//       <div className="text-red-500 p-4">
//         {error?.data?.message || "Failed to fetch product"}
//       </div>
//     );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Edit Product</h1>
//           <p className="text-sm text-gray-600">Update product information.</p>
//         </div>
//         <Button variant="outline" onClick={() => navigate("/admin/inventory")}>
//           Back to Inventory
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
//         <div className="space-y-6 md:col-span-2">
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Product Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label>Product Name</Label>
//                 <Input
//                   name="product"
//                   value={formData.product}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label>Category</Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, category: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((cat) => (
//                       <SelectItem key={cat} value={cat}>
//                         {cat}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label>Description</Label>
//                 <Textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={4}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Inventory & Pricing</CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Stock</Label>
//                 <Input
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleInputChange}
//                   min={0}
//                 />
//               </div>
//               <div>
//                 <Label>Minimum Stock</Label>
//                 <Input
//                   type="number"
//                   name="minStock"
//                   value={formData.minStock}
//                   onChange={handleInputChange}
//                   min={1}
//                 />
//               </div>
//               <div>
//                 <Label>Price (₦)</Label>
//                 <Input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   min={0}
//                 />
//               </div>
//               <div>
//                 <Label>Minimum Order</Label>
//                 <Input
//                   type="number"
//                   name="minOrder"
//                   value={formData.minOrder}
//                   onChange={handleInputChange}
//                   min={1}
//                 />
//               </div>
//               <div className="col-span-2">
//                 <Label>Status</Label>
//                 <Select
//                   value={formData.status}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, status: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select stock status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {statuses.map((s) => (
//                       <SelectItem key={s} value={s}>
//                         {s}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Package Options</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {packages.map((pkg, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-3 gap-2 items-center"
//                 >
//                   <Input
//                     placeholder="Package name"
//                     value={pkg.name}
//                     onChange={(e) =>
//                       handlePackageChange(index, "name", e.target.value)
//                     }
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Quantity"
//                     min={1}
//                     value={pkg.quantity}
//                     onChange={(e) =>
//                       handlePackageChange(
//                         index,
//                         "quantity",
//                         Number(e.target.value)
//                       )
//                     }
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleRemovePackage(index)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleAddPackage}
//               >
//                 Add Package
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Product Image</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {imagePreview || existingImage ? (
//                 <div className="relative">
//                   <img
//                     src={imagePreview || existingImage!}
//                     alt="Preview"
//                     className="w-full h-48 object-contain border rounded"
//                   />
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     className="absolute top-2 right-2"
//                     onClick={handleRemoveImage}
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               ) : (
//                 <div
//                   onClick={() => fileInputRef.current?.click()}
//                   className="h-48 flex flex-col justify-center items-center border border-dashed rounded cursor-pointer"
//                 >
//                   <Upload className="w-6 h-6 text-gray-500" />
//                   <span className="text-sm text-gray-500">Upload Image</span>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Submit</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Button type="submit" className="w-full" disabled={isUpdating}>
//                 {isUpdating ? (
//                   "Saving..."
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4 mr-2" />
//                     Update Product
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../services/api/productsApiSlice";
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
import { Upload, X, Save } from "lucide-react";
import { toast } from "sonner";

export default function EditProduct() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: product,
    isLoading: isProductLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId!);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    product: "",
    stock: 0,
    minStock: 1,
    minOrder: 1,
    category: "",
    price: 0,
    description: "",
    status: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const categories = ["masa", "meat", "soups", "drinks", "extras"];
  const statuses = ["instock", "low stock", "critical"];

  useEffect(() => {
    if (product) {
      setFormData({
        product: product.product,
        stock: product.stock,
        minStock: product.minStock,
        minOrder: product.minOrder ?? 1,
        category: product.category,
        price: product.price,
        description: product.description,
        status: product.status,
      });

      if (product.image) setExistingImage(product.image);
    }
  }, [product]);

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
      setExistingImage(null);

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
    setExistingImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = existingImage;

      if (imageFile) {
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
        imageUrl = data.secure_url;
      }

      const updatedData = {
        ...formData,
        id: productId!,
        image: imageUrl || "",
      };

      await updateProduct(updatedData).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/inventory");
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  if (isProductLoading) return <div>Loading product data...</div>;
  if (isError || !product)
    return (
      <div className="text-red-500 p-4">
        {error?.data?.message || "Failed to fetch product"}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-sm text-gray-600">Update product information.</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/inventory")}>
          Back to Inventory
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
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
                  value={formData.stock}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
              <div>
                <Label>Minimum Stock</Label>
                <Input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleInputChange}
                  min={1}
                />
              </div>
              <div>
                <Label>Price (₦)</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min={0}
                />
              </div>
              <div>
                <Label>Minimum Order</Label>
                <Input
                  type="number"
                  name="minOrder"
                  value={formData.minOrder}
                  onChange={handleInputChange}
                  min={1}
                />
              </div>
              <div className="col-span-2">
                <Label>Status</Label>
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
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview || existingImage ? (
                <div className="relative">
                  <img
                    src={imagePreview || existingImage!}
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
              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Product
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
