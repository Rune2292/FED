import { EfExpense } from "@/types/expense";

interface ExpenseListItemProps {
  expense: EfExpense;
}

export default function ({
  expense: { modelId, date, text, amount },
}: ExpenseListItemProps) {
  return (
    <div className="flex items-center gap-4 hover:bg-gray-200 rounded transition p-2 cursor-pointer">
      <div className="grid gap-1">
        <p className="text-lg font-medium leading-none">{modelId}</p>
        <p className="text-sm text-muted-foreground">
          <span className="italic ">{text}</span>
          <span className="italic ">{date.toString()}</span>
        </p>
      </div>
      <div className="ml-auto font-medium text-right">{amount}</div>
    </div>
  );
}
