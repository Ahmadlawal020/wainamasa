
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Users, Mail, Phone, Clock, CheckCircle } from "lucide-react";

export default function AdminMessaging() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");

  const messageTemplates = [
    {
      id: 1,
      name: "Order Ready",
      subject: "Your Order is Ready for Pickup!",
      content: "Hello {customer_name}, your order #{order_id} is ready for pickup. Please visit us at your convenience.",
      category: "order"
    },
    {
      id: 2,
      name: "New Menu Item",
      subject: "Exciting New Addition to Our Menu!",
      content: "We're excited to introduce our new {item_name}! Made with the finest ingredients and traditional recipes.",
      category: "promotion"
    },
    {
      id: 3,
      name: "Special Offer",
      subject: "Limited Time Offer - 20% Off!",
      content: "Enjoy 20% off on all masa orders this weekend. Use code MASA20 when placing your order.",
      category: "promotion"
    }
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: "Weekend Special Promotion",
      type: "SMS",
      audience: "All Customers",
      sent: 1247,
      delivered: 1198,
      opened: 856,
      status: "completed",
      sentDate: "2025-06-22"
    },
    {
      id: 2,
      name: "Order Ready Notifications",
      type: "Email",
      audience: "Recent Orders",
      sent: 45,
      delivered: 43,
      opened: 38,
      status: "completed",
      sentDate: "2025-06-23"
    },
    {
      id: 3,
      name: "New Menu Launch",
      type: "Both",
      audience: "VIP Customers",
      sent: 234,
      delivered: 225,
      opened: 189,
      status: "in_progress",
      sentDate: "2025-06-23"
    }
  ];

  const audienceOptions = [
    { value: "all", label: "All Customers", count: 1247 },
    { value: "recent", label: "Recent Customers", count: 345 },
    { value: "frequent", label: "Frequent Customers", count: 156 },
    { value: "inactive", label: "Inactive Customers", count: 89 },
    { value: "vip", label: "VIP Customers", count: 45 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Bulk Messaging</h1>
        <p className="text-neutral-600">Send targeted messages to your customers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total Customers</p>
                <p className="text-2xl font-bold text-neutral-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Messages Sent</p>
                <p className="text-2xl font-bold text-neutral-900">3,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Email Open Rate</p>
                <p className="text-2xl font-bold text-neutral-900">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">SMS Delivery</p>
                <p className="text-2xl font-bold text-neutral-900">95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Message Composer */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Compose New Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Select Audience
                  </label>
                  <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} ({option.count} customers)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Subject
                  </label>
                  <Input
                    placeholder="Enter message subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-brand-500 hover:bg-brand-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline">Schedule</Button>
                </div>
              </CardContent>
            </Card>

            {/* Message Preview */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Message Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
                  <div className="border-b border-neutral-200 pb-2">
                    <p className="text-sm text-neutral-600">Subject:</p>
                    <p className="font-medium">{subject || "No subject"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-2">Message:</p>
                    <p className="text-neutral-800">{message || "Your message will appear here..."}</p>
                  </div>
                  <div className="pt-2 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500">
                      Recipients: {selectedAudience ? audienceOptions.find(opt => opt.value === selectedAudience)?.count || 0 : 0} customers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {messageTemplates.map((template) => (
                  <Card key={template.id} className="border border-neutral-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-neutral-900">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-700">{template.subject}</p>
                          <p className="text-xs text-neutral-500 mt-1">{template.content}</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-neutral-900">{campaign.name}</h4>
                        <p className="text-sm text-neutral-500">{campaign.audience} • {campaign.sentDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{campaign.type}</Badge>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-neutral-900">{campaign.sent}</p>
                        <p className="text-xs text-neutral-500">Sent</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{campaign.delivered}</p>
                        <p className="text-xs text-neutral-500">Delivered</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{campaign.opened}</p>
                        <p className="text-xs text-neutral-500">Opened</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
