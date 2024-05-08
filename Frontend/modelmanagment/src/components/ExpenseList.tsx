import { EfExpense } from "@/types/expense";
import ExpenseListItem from "./ExpenseListItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AddModelDialogButton from "./AddModelDialogButton";

type ExpenseListProps = {
  expenses: EfExpense[];
};

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between itmes-center">
          <CardTitle>Expenses</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid gap-2">
        <div className="pt-2">
          {expenses.length === 0 && (
            <div className="text-muted-foreground italic">
              No expenses found
            </div>
          )}
          {expenses.map((expense, index) => (
            <ExpenseListItem key={index} expense={expense} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
