/** @format */

import { useNavigate } from "react-router-dom";
//import IconReturnUpBackOutline from "@/components/ReturnArrow";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToManagerDashboardProps {
  className?: string;
}

export const BackToManagerDashboard: React.FC<BackToManagerDashboardProps> = ({
  className,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() => navigate("/manager-dashboard")}
      className={cn(className)}
    >
      <div className="flex gap-1 items-center">
        <ChevronLeft size={24} />
        <div className="ml-2">Back to dashboard</div>
      </div>
    </Button>
  );
};
