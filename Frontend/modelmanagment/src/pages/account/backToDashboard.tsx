/** @format */

import { useNavigate } from "react-router-dom";
//import IconReturnUpBackOutline from "@/components/ReturnArrow";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

interface BackToDashboardProps {
  className?: string;
}

export const BackToDashboard: React.FC<BackToDashboardProps> = ({
  className,
}) => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/dashboard")} className={className}>
      {/* <IconReturnUpBackOutline /> */}
      <MoveLeft size={24} />
      <div className="ml-2">Back to dashboard</div>
    </Button>
  );
};
