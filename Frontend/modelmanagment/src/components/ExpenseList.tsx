import { EfExpense } from "@/types/expense";
import ExpenseListItem from "./ExpenseListItem";

type ExpenseListProps = {
  expenses: EfExpense[];
};

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Start Date</th>
            <th>Comments</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          '
          {expenses.map((expense, index) => (
            <ExpenseListItem key={index} expense={expense} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
