// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetUsersQuery,
//   useDeleteUserMutation,
// } from "../../services/api/userApiSlice";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   User,
//   Mail,
//   Phone,
//   Shield,
//   Check,
//   X,
// } from "lucide-react";

// export default function AdminUsers() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const { data: users = [], isLoading, isError } = useGetUsersQuery();
//   const [deleteUser] = useDeleteUserMutation();

//   const getStatusBadge = (status: boolean) => {
//     return status ? (
//       <Badge
//         variant="secondary"
//         className="gap-1 bg-green-100 text-green-800 border-green-200"
//       >
//         <Check className="h-3 w-3" /> Active
//       </Badge>
//     ) : (
//       <Badge variant="destructive" className="gap-1">
//         <X className="h-3 w-3" /> Inactive
//       </Badge>
//     );
//   };

//   const getRoleBadges = (roles: string[]) => (
//     <div className="flex flex-wrap gap-1">
//       {roles.map((role, index) => (
//         <Badge key={index} variant="outline" className="gap-1">
//           <Shield className="h-3 w-3" /> {role}
//         </Badge>
//       ))}
//     </div>
//   );

//   const filteredUsers = users.filter(
//     (user) =>
//       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.phoneNumber.includes(searchTerm)
//   );

//   const totalUsers = users.length;
//   const activeUsers = users.filter((user) => user.status).length;
//   const adminUsers = users.filter((user) =>
//     user.roles.includes("Admin")
//   ).length;

//   const handleNewUser = () => navigate("newuser");

//   if (isLoading)
//     return <p className="text-sm text-neutral-500">Loading users...</p>;
//   if (isError)
//     return <p className="text-sm text-red-500">Failed to load users.</p>;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-neutral-900">
//             User Management
//           </h1>
//           <p className="text-neutral-600">
//             Manage system users and permissions
//           </p>
//         </div>
//         <Button
//           className="bg-brand-500 hover:bg-brand-600 text-white"
//           onClick={handleNewUser}
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add New User
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <User className="h-8 w-8 text-blue-500" />
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-neutral-600">
//                   Total Users
//                 </p>
//                 <p className="text-2xl font-bold text-neutral-900">
//                   {totalUsers}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <Check className="h-8 w-8 text-green-500" />
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-neutral-600">
//                   Active Users
//                 </p>
//                 <p className="text-2xl font-bold text-neutral-900">
//                   {activeUsers}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <Shield className="h-8 w-8 text-purple-500" />
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-neutral-600">
//                   Admin Users
//                 </p>
//                 <p className="text-2xl font-bold text-neutral-900">
//                   {adminUsers}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search */}
//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-6">
//           <div className="flex items-center space-x-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
//               <Input
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button variant="outline">Filter</Button>
//             <Button variant="outline">Export</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Table */}
//       <Card className="border-0 shadow-sm">
//         <CardHeader>
//           <CardTitle>System Users</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {filteredUsers.length === 0 ? (
//             <p className="text-sm text-neutral-500">
//               No users match your search.
//             </p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>Contact</TableHead>
//                   <TableHead>Roles</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell className="font-medium">
//                       <div>
//                         <p>
//                           {user.firstName} {user.lastName}
//                         </p>
//                         <p className="text-sm text-neutral-500">{user.email}</p>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Mail className="h-4 w-4 text-neutral-500" />
//                         <span className="text-neutral-600">{user.email}</span>
//                       </div>
//                       <div className="flex items-center gap-2 mt-1">
//                         <Phone className="h-4 w-4 text-neutral-500" />
//                         <span className="text-neutral-600">
//                           {user.phoneNumber || "N/A"}
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>{getRoleBadges(user.roles)}</TableCell>
//                     <TableCell>{getStatusBadge(user.status)}</TableCell>
//                     <TableCell className="text-neutral-600">
//                       {user.createdAt}
//                     </TableCell>

//                     <TableCell className="text-right">
//                       <div className="flex items-center justify-end space-x-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() =>
//                             navigate(`/admin/team/edituser/${user._id}`)
//                           }
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-red-600 hover:text-red-700"
//                           onClick={() => deleteUser({ id: user.id })}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../services/api/userApiSlice";

import { toast } from "@/components/ui/use-toast"; // ✅ Import toast

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
  User,
  Mail,
  Phone,
  Shield,
  Check,
  X,
} from "lucide-react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation(); // ✅ Track delete loading state

  const getStatusBadge = (status: boolean) => {
    return status ? (
      <Badge
        variant="secondary"
        className="gap-1 bg-green-100 text-green-800 border-green-200"
      >
        <Check className="h-3 w-3" /> Active
      </Badge>
    ) : (
      <Badge variant="destructive" className="gap-1">
        <X className="h-3 w-3" /> Inactive
      </Badge>
    );
  };

  const getRoleBadges = (roles: string[]) => (
    <div className="flex flex-wrap gap-1">
      {roles.map((role, index) => (
        <Badge key={index} variant="outline" className="gap-1">
          <Shield className="h-3 w-3" /> {role}
        </Badge>
      ))}
    </div>
  );

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)
  );

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status).length;
  const adminUsers = users.filter((user) =>
    user.roles.includes("Admin")
  ).length;

  const handleNewUser = () => navigate("newuser");

  // ✅ Handle Delete with confirmation and toast feedback
  const handleDelete = async (id: string, name: string) => {
    const confirmed = confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmed) return;

    try {
      await deleteUser({ id }).unwrap();
      toast({
        title: "User Deleted",
        description: `${name} has been successfully removed.`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Delete Failed",
        description: `There was an error deleting ${name}.`,
        variant: "destructive",
      });
    }
  };

  if (isLoading)
    return <p className="text-sm text-neutral-500">Loading users...</p>;
  if (isError)
    return <p className="text-sm text-red-500">Failed to load users.</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            User Management
          </h1>
          <p className="text-neutral-600">
            Manage system users and permissions
          </p>
        </div>
        <Button
          className="bg-brand-500 hover:bg-brand-600 text-white"
          onClick={handleNewUser}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {totalUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Check className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {activeUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">
                  Admin Users
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {adminUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search users..."
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

      {/* Users Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No users match your search.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <span className="text-neutral-600">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-neutral-500" />
                        <span className="text-neutral-600">
                          {user.phoneNumber || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadges(user.roles)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-neutral-600">
                      {user.createdAt}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/team/edituser/${user._id}`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          disabled={isDeleting}
                          onClick={() =>
                            handleDelete(
                              user._id,
                              `${user.firstName} ${user.lastName}`
                            )
                          }
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
