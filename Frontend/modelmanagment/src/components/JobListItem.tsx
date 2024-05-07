import { Job } from "@/types/job";
import { format } from "date-fns";

interface JobListItemProps {
  job: Job;
  onClick: () => void;
}

export default function JobListItem({ job, onClick }: JobListItemProps) {
  const startDate = format(new Date(job.startDate), "d. MMM yyyy");
  const startTime = format(new Date(job.startDate), "hh:mm aaaa");

  return (
    <div
      className="flex items-center gap-4 hover:bg-gray-200 rounded transition p-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="grid gap-1">
        <p className="text-lg font-medium leading-none">{job.customer}</p>
        <p className="text-sm text-muted-foreground">
          {job.location} <br />
          <span className="italic ">{job.comments}</span>
        </p>
      </div>
      <div className="ml-auto font-medium text-right">
        {startDate} <br /> {startTime}
      </div>
    </div>
  );
}
