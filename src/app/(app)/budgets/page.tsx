
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { CategoryCard } from '@/components/budget/category-card';
import { CategoryForm } from '@/components/budget/category-form';
import type { MonthlyBudget, Category, ExpenseItem } from '@/types';
import { PlusCircle, Edit, AlertTriangle, Info } from 'lucide-react';
import { DEFAULT_CATEGORIES, CATEGORY_ICONS } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";
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
import { cn } from '@/lib/utils';

// Mock data for demonstration
const MOCK_EXPENSES: ExpenseItem[] = [
    { id: 'exp1', categoryId: 'cat1', date: new Date().toISOString(), amount: 50, description: 'Lunch' },
    { id: 'exp2', categoryId: 'cat1', date: new Date().toISOString(), amount: 25, description: 'Coffee' },
    { id: 'exp3', categoryId: 'cat2', date: new Date().toISOString(), amount: 70, description: 'Gas' },
];


export default function BudgetsPage() {
  const { toast } = useToast();
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudget | null>(null);
  const [totalMonthlyBudgetInput, setTotalMonthlyBudgetInput] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);


  useEffect(() => {
    // Simulate fetching current month's budget
    const currentMonthId = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    const monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const initialCategories = DEFAULT_CATEGORIES.map((cat, index) => ({
      id: `cat${index + 1}`,
      name: cat.name,
      budget: Math.floor(Math.random() * 300) + 100, // Random budget between 100-400
      spent: 0, // Will be calculated
      icon: cat.icon,
    }));

    // Calculate spent amounts for each category
    initialCategories.forEach(category => {
        category.spent = MOCK_EXPENSES
            .filter(exp => exp.categoryId === category.id)
            .reduce((sum, exp) => sum + exp.amount, 0);
    });
    
    const totalInitialBudget = initialCategories.reduce((sum, cat) => sum + cat.budget, 0);
    setTotalMonthlyBudgetInput(totalInitialBudget);

    setCategories(initialCategories);
    setMonthlyBudget({
      id: currentMonthId,
      monthName: monthName,
      totalBudget: totalInitialBudget,
      categories: initialCategories,
    });
  }, []);

  const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalMonthlyBudgetInput(parseFloat(e.target.value) || 0);
  };

  const saveTotalMonthlyBudget = () => {
    if (monthlyBudget) {
      setMonthlyBudget({ ...monthlyBudget, totalBudget: totalMonthlyBudgetInput });
      toast({ title: "Success", description: "Overall monthly budget updated." });
    }
  };

  const handleCategorySubmit = (values: { name: string; budget: number; icon?: string }) => {
    if (editingCategory) {
      // Edit existing category
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...values, spent: cat.spent } : cat
      );
      setCategories(updatedCategories);
      if (monthlyBudget) {
        setMonthlyBudget({ ...monthlyBudget, categories: updatedCategories });
      }
      toast({ title: "Success", description: `Category "${values.name}" updated.` });
    } else {
      // Add new category
      const newCategory: Category = {
        id: `cat${Date.now()}`,
        ...values,
        spent: 0,
      };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
       if (monthlyBudget) {
        setMonthlyBudget({ ...monthlyBudget, categories: updatedCategories });
      }
      toast({ title: "Success", description: `Category "${values.name}" added.` });
    }
    setIsCategoryFormOpen(false);
    setEditingCategory(null);
  };

  const openEditCategoryForm = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(updatedCategories);
    if (monthlyBudget) {
        setMonthlyBudget({ ...monthlyBudget, categories: updatedCategories });
    }
    setDeleteCategoryId(null);
    toast({ title: "Success", description: "Category deleted." });
  };

  const totalBudgetedForCategories = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpentOverall = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const overallRemaining = monthlyBudget ? monthlyBudget.totalBudget - totalSpentOverall : 0;
  const overallSpentPercentage = monthlyBudget && monthlyBudget.totalBudget > 0 ? (totalSpentOverall / monthlyBudget.totalBudget) * 100 : 0;

  if (!monthlyBudget) {
    return <div className="p-6 text-center">Loading budget data...</div>;
  }
  
  const budgetMismatch = totalBudgetedForCategories !== monthlyBudget.totalBudget;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">Manage Budgets - {monthlyBudget.monthName}</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Overall Monthly Budget</CardTitle>
          <CardDescription>Set and track your total spending limit for the month.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow">
              <Label htmlFor="totalMonthlyBudget">Total Budget Amount ($)</Label>
              <Input
                id="totalMonthlyBudget"
                type="number"
                value={totalMonthlyBudgetInput}
                onChange={handleTotalBudgetChange}
                placeholder="e.g., 2000"
                className="mt-1"
              />
            </div>
            <Button onClick={saveTotalMonthlyBudget} className="gradient-primary text-primary-foreground w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" /> Update Overall Budget
            </Button>
          </div>
          {budgetMismatch && (
            <div className="mt-2 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-md text-sm text-yellow-700 dark:text-yellow-300 flex items-start">
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                Your total budget for categories (${totalBudgetedForCategories.toLocaleString()}) does not match your overall monthly budget (${monthlyBudget.totalBudget.toLocaleString()}). 
                Please adjust your category budgets or the overall monthly budget.
              </div>
            </div>
          )}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span>Total Spent: ${totalSpentOverall.toLocaleString()}</span>
              <span className={overallRemaining < 0 ? "text-destructive" : "text-green-600"}>
                Remaining: ${overallRemaining.toLocaleString()}
              </span>
            </div>
            <Progress value={Math.min(overallSpentPercentage,100)} className={cn("h-4", overallSpentPercentage > 100 ? "[&>div]:bg-destructive" : "")} />
            {overallSpentPercentage > 100 && (
                <p className="text-xs text-destructive mt-1 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" /> You've exceeded your overall monthly budget!
                </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl">Category Budgets</CardTitle>
            <CardDescription>Manage budgets for individual spending categories.</CardDescription>
          </div>
          <Dialog open={isCategoryFormOpen} onOpenChange={setIsCategoryFormOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-accent text-accent-foreground" onClick={() => setEditingCategory(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit' : 'Add New'} Category</DialogTitle>
                <DialogDescription>
                  {editingCategory ? 'Update the details for this category.' : 'Define a new spending category and its budget.'}
                </DialogDescription>
              </DialogHeader>
              <CategoryForm 
                onSubmit={handleCategorySubmit} 
                initialData={editingCategory || undefined} 
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No categories added yet. Click "Add Category" to get started.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={openEditCategoryForm}
                  onDelete={() => setDeleteCategoryId(category.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
       <AlertDialog open={!!deleteCategoryId} onOpenChange={() => setDeleteCategoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category and all associated expenses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteCategory(deleteCategoryId!)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
