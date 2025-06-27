// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { ArrowLeft, Mail, Phone, User, Shield, Check, X } from "lucide-react";
// import { useCreateUserMutation } from "../../services/api/userApiSlice";

// // Zod schema for validation
// const formSchema = z
//   .object({
//     firstName: z
//       .string()
//       .min(3, { message: "First name must be at least 3 characters." }),
//     lastName: z
//       .string()
//       .min(3, { message: "Last name must be at least 3 characters." }),
//     email: z.string().email({ message: "Please enter a valid email address." }),
//     phoneNumber: z
//       .string()
//       .min(11, { message: "Phone number must be at least 11 digits." }),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters." }),
//     confirmPassword: z.string(),
//     roles: z.array(z.string()),
//     status: z.boolean(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// // Role options
// const availableRoles = [
//   { value: "SuperAdmin", label: "SuperAdmin" },
//   { value: "Admin", label: "Administrator" },
//   { value: "Employee", label: "Employee" },
// ];

// export default function AddUserForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [createUser] = useCreateUserMutation();
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       password: "",
//       confirmPassword: "",
//       roles: ["Employee"],
//       status: true,
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         phoneNumber: values.phoneNumber,
//         password: values.password,
//         roles: values.roles,
//         status: values.status ? "Available" : "Inactive",
//       };

//       await createUser(payload).unwrap();

//       // Show success toast
//       toast.success(
//         `User ${values.firstName} ${values.lastName} created successfully!`,
//         {
//           duration: 2000,
//           position: "top-center",
//         }
//       );

//       // Wait for the toast to show before redirecting
//       setTimeout(() => {
//         navigate("/admin/team"); // Redirect to users list page
//       }, 1500);
//     } catch (err: any) {
//       console.error("Error creating user:", err);
//       toast.error(
//         err?.data?.message || "Failed to create user. Please try again.",
//         {
//           duration: 4000,
//         }
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => navigate(-1)} // Go back to previous page
//         >
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <div>
//           <h1 className="text-2xl font-bold text-neutral-900">Add New User</h1>
//           <p className="text-neutral-600">
//             Create a new user account with appropriate permissions
//           </p>
//         </div>
//       </div>

//       {/* Form Card */}
//       <Card className="border-0 shadow-sm">
//         <CardHeader>
//           <CardTitle>User Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* First Name */}
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         <div className="flex items-center gap-2">
//                           <User className="h-4 w-4 text-neutral-500" />
//                           <span>First Name</span>
//                         </div>
//                       </FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter first name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Last Name */}
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter last name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Email */}
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         <div className="flex items-center gap-2">
//                           <Mail className="h-4 w-4 text-neutral-500" />
//                           <span>Email Address</span>
//                         </div>
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="Enter email address"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Phone Number */}
//                 <FormField
//                   control={form.control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         <div className="flex items-center gap-2">
//                           <Phone className="h-4 w-4 text-neutral-500" />
//                           <span>Phone Number</span>
//                         </div>
//                       </FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter phone number" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Password */}
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="Enter password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription>Minimum 8 characters</FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Confirm Password */}
//                 <FormField
//                   control={form.control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Confirm Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="Confirm password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Roles */}
//                 <FormField
//                   control={form.control}
//                   name="roles"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>
//                         <div className="flex items-center gap-2">
//                           <Shield className="h-4 w-4 text-neutral-500" />
//                           <span>User Roles</span>
//                         </div>
//                       </FormLabel>
//                       <div className="space-y-2">
//                         {availableRoles.map((role) => (
//                           <FormField
//                             key={role.value}
//                             control={form.control}
//                             name="roles"
//                             render={({ field }) => (
//                               <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value.includes(role.value)}
//                                     onCheckedChange={(checked) => {
//                                       const updatedRoles = checked
//                                         ? [...field.value, role.value]
//                                         : field.value.filter(
//                                             (val) => val !== role.value
//                                           );
//                                       field.onChange(updatedRoles);
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {role.label}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Status */}
//                 <FormField
//                   control={form.control}
//                   name="status"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel>Account Status</FormLabel>
//                       <Select
//                         onValueChange={(val) =>
//                           field.onChange(val === "active")
//                         }
//                         defaultValue={field.value ? "active" : "inactive"}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select status" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="active">
//                             <div className="flex items-center gap-2">
//                               <Check className="h-4 w-4 text-green-500" />
//                               Active
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="inactive">
//                             <div className="flex items-center gap-2">
//                               <X className="h-4 w-4 text-red-500" />
//                               Inactive
//                             </div>
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormDescription>
//                         Active users can log in to the system
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Submit + Reset */}
//               <div className="flex justify-end gap-4 pt-4">
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={() => form.reset()}
//                 >
//                   Reset
//                 </Button>
//                 <Button type="submit" disabled={isSubmitting}>
//                   {isSubmitting ? "Creating User..." : "Create User"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ArrowLeft, Mail, Phone, User, Shield, Check, X } from "lucide-react";
import { useCreateUserMutation } from "../../services/api/userApiSlice";

// Zod schema for validation
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters." }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phoneNumber: z
      .string()
      .min(11, { message: "Phone number must be at least 11 digits." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    roles: z.array(z.string()),
    status: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Role options
const availableRoles = [
  { value: "SuperAdmin", label: "SuperAdmin" },
  { value: "Admin", label: "Administrator" },
  { value: "Employee", label: "Employee" },
];

export default function AddUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      roles: ["Employee"],
      status: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        roles: values.roles,
        status: values.status ? "Available" : "Inactive",
      };

      await createUser(payload).unwrap();

      toast({
        title: "User Created",
        description: `User ${values.firstName} ${values.lastName} created successfully!`,
      });

      setTimeout(() => {
        navigate("/admin/team");
      }, 1500);
    } catch (err: any) {
      console.error("Error creating user:", err);
      toast({
        title: "Error",
        description:
          err?.data?.message || "Failed to create user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Add New User</h1>
          <p className="text-neutral-600">
            Create a new user account with appropriate permissions
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-neutral-500" />
                          <span>First Name</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-neutral-500" />
                          <span>Email Address</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-neutral-500" />
                          <span>Phone Number</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Minimum 8 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Roles */}
                <FormField
                  control={form.control}
                  name="roles"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-neutral-500" />
                          <span>User Roles</span>
                        </div>
                      </FormLabel>
                      <div className="space-y-2">
                        {availableRoles.map((role) => (
                          <FormField
                            key={role.value}
                            control={form.control}
                            name="roles"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value.includes(role.value)}
                                    onCheckedChange={(checked) => {
                                      const updatedRoles = checked
                                        ? [...field.value, role.value]
                                        : field.value.filter(
                                            (val) => val !== role.value
                                          );
                                      field.onChange(updatedRoles);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {role.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Account Status</FormLabel>
                      <Select
                        onValueChange={(val) =>
                          field.onChange(val === "active")
                        }
                        defaultValue={field.value ? "active" : "inactive"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="inactive">
                            <div className="flex items-center gap-2">
                              <X className="h-4 w-4 text-red-500" />
                              Inactive
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Active users can log in to the system
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit + Reset */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating User..." : "Create User"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
