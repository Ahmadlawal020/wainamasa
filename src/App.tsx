import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminInventory from "./pages/admin/AdminInventory";
import NewUser from "./pages/admin/NewUser";
import AdminMessaging from "./pages/admin/AdminMessaging";
import Login from "./pages/admin/Login";
import PersistLogin from "./services/PerasistLogin";
import RequireAuth from "./services/RequireAuth";

import { ROLES } from "./config/roles";
import AdminUsers from "./pages/admin/AdminUsers";
import EditUserForm from "./pages/admin/EditUserForm";
import NewProduct from "./pages/admin/NewProduct";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";
import OrderDetailsPage from "./pages/admin/OrderDetail";
import AdminOrders from "./pages/admin/AdminOrder";
import ComingSoon from "./pages/ComingSoon";
import SettingsPage from "./pages/admin/SettingsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import NewCategory from "./pages/admin/NewCategory";
import EditCategory from "./pages/admin/EditCategory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />

            {/* Protected admin routes */}
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={
                      Object.values(ROLES) as Array<
                        (typeof ROLES)[keyof typeof ROLES]
                      >
                    }
                  />
                }
              >
                {/* put it back here  */}
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<AdminHome />} />
                  <Route path="inventory">
                    <Route index element={<AdminInventory />} />
                    <Route path="newproduct" element={<NewProduct />} />
                    <Route
                      path="editproduct/:productId"
                      element={<EditProduct />}
                    />
                  </Route>
                  <Route path="messaging" element={<AdminMessaging />} />
                  <Route path="team">
                    <Route index element={<AdminUsers />} />
                    <Route path="newuser" element={<NewUser />} />
                    <Route path="edituser/:userId" element={<EditUserForm />} />
                  </Route>
                  <Route path="orders">
                    <Route index element={<Orders />} />
                    <Route
                      path="orderdetails/:orderId"
                      element={<OrderDetailsPage />}
                    />
                  </Route>
                  <Route path="analytics" element={<AdminOrders />} />
                  <Route path="customers" element={<ComingSoon />} />
                  <Route path="settings">
                    <Route index element={<SettingsPage />} />
                    <Route path="categories">
                      <Route index element={<CategoriesPage />} />
                      <Route path="newCategory" element={<NewCategory />} />
                      <Route
                        path="EditCategory/:id"
                        element={<EditCategory />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
