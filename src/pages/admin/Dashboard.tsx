import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Menu,
  LogOut,
  X,
  Package,
  MessageSquare,
  BarChart3,
  UserPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLogoutUserMutation } from "../../services/api/authApiSlice";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Inventory", path: "/admin/inventory", icon: Package },
    { name: "Team", path: "/admin/team", icon: UserPen },
    { name: "Order History", path: "/admin/analytics", icon: BarChart3 },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Messaging", path: "/admin/messaging", icon: MessageSquare },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
              alt="Masa Treat"
              className="h-12 w-auto"
              style={{ filter: "contrast(1.1) brightness(0.95)" }}
            />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive(item.path)
                  ? "bg-green-50 text-green-700 border border-green-200 shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header for mobile */}
        <header className="bg-white border-b py-4 px-4 sm:px-6 flex items-center justify-between lg:hidden shadow-sm">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
              alt="Masa Treat"
              className="h-8 sm:h-10 w-auto"
              style={{ filter: "contrast(1.1) brightness(0.95)" }}
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b">
                <Link to="/" className="flex items-center">
                  <img
                    src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
                    alt="Masa Treat"
                    className="h-10 sm:h-12 w-auto"
                    style={{ filter: "contrast(1.1) brightness(0.95)" }}
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-4 rounded-lg text-base font-medium transition-all duration-200",
                      isActive(item.path)
                        ? "bg-green-50 text-green-700 border border-green-200 shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-4 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="p-4 mt-auto border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 py-4"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-neutral-50 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
