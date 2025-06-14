
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { ExpenseForm } from '@/components/expense/expense-form';
import type { Category, ExpenseItem } from '@/types';
import { PlusCircle, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import * as LucideIcons from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { DEFAULT_CATEGORIES } from '@/lib/constants';

// Mock data
const MOCK_INITIAL_CATEGORIES: Category[] = DEFAULT_CATEGORIES.map((cat, index) => ({
    id: `cat${index+1}`,
    name: cat.name,
    budget: 200 + index * 50,
    spent: 0,
    icon: cat.icon,
}));

const MOCK_INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'exp1', categoryId: 'cat1', date: new Date(2023, 9, 15).toISOString(), amount: 50, description: 'Groceries for the week' },
  { id: 'exp2', categoryId: 'cat2', date: new Date(2023, 9, 16).toISOString(), amount: 30, description: 'Bus fare' },
  { id: 'exp3', categoryId: 'cat1', date: new Date(2023, 9, 18).toISOString(), amount: 120, description: 'Dinner with friends' },
  { id: 'exp4', categoryId: 'cat3', date: new Date(2023, 9, 20).toISOString(), amount: 1200, description: 'Monthly rent' },
];

export default function ExpensesPage() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<ExpenseItem[]>(MOCK_INITIAL_EXPENSES);
  const [categories, setCategories] = useState<Category[]>(MOCK_INITIAL_CATEGORIES);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [deleteExpenseId, setDeleteExpenseId] = useState<string | null>(null);


  useEffect(() => {
    // Calculate spent amounts for categories based on current expenses
    const updatedCategories = categories.map(cat => {
        const spent = expenses
            .filter(exp => exp.categoryId === cat.id)
            .reduce((sum, exp) => sum + exp.amount, 0);
        return { ...cat, spent };
    });
    setCategories(updatedCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]); // Recalculate when expenses change

  const handleExpenseSubmit = (values: { categoryId: string; amount: number; date: Date; description?: string }) => {
    const expenseData = { ...values, date: values.date.toISOString() };
    if (editingExpense) {
      const updatedExpenses = expenses.map(exp =>
        exp.id === editingExpense.id ? { ...exp, ...expenseData } : exp
      );
      setExpenses(updatedExpenses);
      toast({ title: "Success", description: "Expense updated." });
    } else {
      const newExpense: ExpenseItem = {
        id: `exp${Date.now()}`,
        ...expenseData,
      };
      setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
      toast({ title: "Success", description: "Expense added." });
    }
    setIsExpenseFormOpen(false);
    setEditingExpense(null);
  };

  const openEditExpenseForm = (expense: ExpenseItem) => {
    setEditingExpense(expense);
    setIsExpenseFormOpen(true);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(exp => exp.id !== expenseId));
    setDeleteExpenseId(null);
    toast({ title: "Success", description: "Expense deleted." });
  };
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'N/A';
  };
  const getCategoryIcon = (categoryId: string) => {
    const iconName = categories.find(cat => cat.id === categoryId)?.icon;
    return iconName ? (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon || LucideIcons.Shapes) : LucideIcons.Shapes;
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">Track Expenses</h1>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl">Expense Log</CardTitle>
            <CardDescription>View and manage your recorded expenses.</CardDescription>
          </div>
          <Dialog open={isExpenseFormOpen} onOpenChange={setIsExpenseFormOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-accent text-accent-foreground" onClick={() => setEditingExpense(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingExpense ? 'Edit' : 'Add New'} Expense</DialogTitle>
                <DialogDescription>
                  {editingExpense ? 'Update the details for this expense.' : 'Record a new spending transaction.'}
                </DialogDescription>
              </DialogHeader>
              <ExpenseForm 
                onSubmit={handleExpenseSubmit}
                categories={categories}
                initialData={editingExpense || undefined}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No expenses recorded yet. Click "Add Expense" to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => {
                    const CategoryIcon = getCategoryIcon(expense.categoryId);
                    return (
                    <TableRow key={expense.id}>
                      <TableCell>{format(new Date(expense.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="flex items-center w-fit">
                           <CategoryIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                           {getCategoryName(expense.categoryId)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={expense.description}>{expense.description || '-'}</TableCell>
                      <TableCell className="text-right">${expense.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditExpenseForm(expense)}>
                              <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeleteExpenseId(expense.id)} className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <AlertDialog open={!!deleteExpenseId} onOpenChange={() => setDeleteExpenseId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this expense.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteExpense(deleteExpenseId!)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
