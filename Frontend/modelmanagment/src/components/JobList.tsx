import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/types/job";
import JobListItem from "./JobListItem";
import AddJobDialogButton from "./AddJobDialogButton";

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onAddJob?: () => void;
}

export default function JobList({ jobs, onJobClick, onAddJob }: JobListProps) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-2">
        <CardTitle className="col-span-1">All active jobs</CardTitle>
        <CardTitle className="col-span-1 text-right">
          {onAddJob && <AddJobDialogButton onAddJob={onAddJob} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {jobs.length === 0 && (
          <div className="text-muted-foreground italic">No jobs found</div>
        )}
        {jobs.map((job) => (
          <JobListItem
            key={job.jobId}
            job={job}
            onClick={() => onJobClick(job)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
