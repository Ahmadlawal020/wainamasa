import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
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
        <CartProvider>
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
                      <Route
                        path="edituser/:userId"
                        element={<EditUserForm />}
                      />
                    </Route>
                    <Route path="orders" element={<AdminHome />} />
                    <Route path="analytics" element={<AdminHome />} />
                    <Route path="customers" element={<AdminHome />} />
                    <Route path="settings" element={<AdminHome />} />
                  </Route>
                </Route>
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
