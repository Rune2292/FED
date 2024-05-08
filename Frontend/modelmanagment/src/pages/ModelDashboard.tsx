/** @format */

import { Welcome } from "./dashboard/welcome";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Job } from "@/types/job";
import JobList from "@/components/JobList";
import { useAuthStore } from "@/state/authStore";
import AddExpenseDialog from "@/components/AddExpenseDialog";

export default function ModelDashboard() {
  const { modelId } = useAuthStore();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);

  const fetchJobs = useCallback(() => {
    axios.get(`http://localhost:7181/api/jobs`).then((response) => {
      setJobs(response.data);
    });
  }, [setJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  function handleAddExpense(forJobId: number) {
    setCurrentJobId(forJobId);
  }

  return (
    <>
      <AddExpenseDialog
        open={currentJobId !== null}
        onOpenChange={() => setCurrentJobId(null)}
        jobId={currentJobId!}
        modelId={modelId!}
      />
      <div className="flex flex-col sm:mx-12">
        <header className="py-8 col-span-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-6xl font-bold ">Model dashboard 🤑</h1>
              <div className="py-2">
                <Welcome />
              </div>
            </div>
          </div>
        </header>

        <div className="col-span-2">
          <JobList
            jobs={jobs}
            onJobClick={({ jobId }) => handleAddExpense(jobId)}
          />
        </div>
      </div>
    </>
  );
}
