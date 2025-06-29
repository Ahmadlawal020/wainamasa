// pages/ComingSoon.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] px-4">
      <Card className="max-w-md w-full text-center shadow-md border-0">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <Sparkles className="h-10 w-10 text-brand-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900">
            Coming Soon 🚧
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-neutral-600">
            We're working hard on this feature. Check back again soon!
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
            <Clock className="h-4 w-4" />
            <span>Expected Launch: Q3 2025</span>
          </div>

          <Button
            className="bg-brand-500 hover:bg-brand-600 text-white w-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
