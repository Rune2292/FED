/** @format */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ManagerMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4">
      <Button onClick={() => navigate("/create-account")}>
        Create new account
      </Button>
      <Button onClick={() => navigate("/add-job")}>Add a new job!</Button>
      <Button onClick={() => navigate("/manage-models")}>
        Manage your models here
      </Button>
      <Button onClick={() => navigate("/see-all-jobs")}>See all jobs </Button>
    </div>
  );
};
