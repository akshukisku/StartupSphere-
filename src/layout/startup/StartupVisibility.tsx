"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck } from "lucide-react";

const StartupVisibility = () => {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="space-y-6 p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BadgeCheck className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Profile Visibility
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your startup profile is currently visible to verified investors.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Profile Completion</span>
            <span className="font-medium">80%</span>
          </div>

          <Progress value={80} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StartupVisibility;