import { useNavigate } from "react-router-dom";
import {
  Settings,
  Tag,
  MapPin,
  Clock,
  Shield,
  Mail,
  CreditCard,
  Bell,
  Check,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const navigate = useNavigate();

  const settingsCategories = [
    {
      title: "Categories",
      description: "Manage product categories and subcategories",
      icon: <Tag className="h-6 w-6 text-blue-500" />,
      path: "/admin/settings/categories",
    },
    {
      title: "Delivery Zones",
      description: "Configure delivery areas and fees",
      icon: <MapPin className="h-6 w-6 text-green-500" />,
      path: "/admin/settings/delivery-zones",
    },
    // {
    //   title: "Business Hours",
    //   description: "Set your operating hours",
    //   icon: <Clock className="h-6 w-6 text-purple-500" />,
    //   path: "/settings/business-hours",
    // },
    // {
    //   title: "Roles & Permissions",
    //   description: "Manage user access levels",
    //   icon: <Shield className="h-6 w-6 text-orange-500" />,
    //   path: "/settings/permissions",
    // },
    // {
    //   title: "Notifications",
    //   description: "Configure email and system alerts",
    //   icon: <Bell className="h-6 w-6 text-yellow-500" />,
    //   path: "/settings/notifications",
    // },
    // {
    //   title: "Payment Methods",
    //   description: "Manage accepted payment options",
    //   icon: <CreditCard className="h-6 w-6 text-red-500" />,
    //   path: "/settings/payments",
    // },
    // {
    //   title: "Email Templates",
    //   description: "Customize system emails",
    //   icon: <Mail className="h-6 w-6 text-cyan-500" />,
    //   path: "/settings/emails",
    // },
    // {
    //   title: "System Settings",
    //   description: "General application configuration",
    //   icon: <Settings className="h-6 w-6 text-gray-500" />,
    //   path: "/settings/system",
    // },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            System Settings
          </h1>
          <p className="text-neutral-600">
            Configure application preferences and features
          </p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Advanced Settings
        </Button>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {settingsCategories.map((category, index) => (
          <Card
            key={index}
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(category.path)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                {category.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600">{category.description}</p>
              <div className="mt-4 flex justify-end">
                <Badge variant="outline" className="text-xs">
                  Configure
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Delivery zones updated</p>
                <p className="text-xs text-neutral-500">2 hours ago by Admin</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Tag className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">New category added</p>
                <p className="text-xs text-neutral-500">Yesterday by Manager</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
