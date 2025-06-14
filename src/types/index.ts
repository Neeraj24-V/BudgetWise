
export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
  icon?: string; // Lucide icon name string
}

export interface ExpenseItem {
  id: string;
  categoryId: string;
  date: string; // ISO string
  amount: number;
  description?: string;
}

export interface MonthlyBudget {
  id: string; // e.g., "2023-10"
  monthName: string; // e.g., "October 2023"
  totalBudget: number;
  categories: Category[];
}

export interface AnnualExpenseSummary {
  month: string; // "Jan", "Feb", etc.
  year: number;
  totalExpenses: number;
}
