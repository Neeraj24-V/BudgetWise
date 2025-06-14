
"use client";

import type { Category } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import * as LucideIcons from 'lucide-react';
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const spentPercentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
  const remaining = category.budget - category.spent;
  const isOverBudget = spentPercentage > 100;

  const IconComponent = category.icon ? (LucideIcons[category.icon as keyof typeof LucideIcons] as LucideIcons.LucideIcon || LucideIcons.Shapes) : LucideIcons.Shapes;

  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col", isOverBudget ? "border-destructive ring-2 ring-destructive/50" : "")}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center">
            <IconComponent className="mr-2 h-5 w-5 text-primary" />
            {category.name}
          </CardTitle>
          <CardDescription>Budget: ${category.budget.toLocaleString()}</CardDescription>
        </div>
        {isOverBudget && (
          <AlertTriangle className="h-5 w-5 text-destructive" title="Over budget!" />
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Spent: ${category.spent.toLocaleString()}</span>
            <span className={cn("font-medium", remaining < 0 ? "text-destructive" : "text-green-600")}>
              Remaining: ${remaining.toLocaleString()}
            </span>
          </div>
          <Progress value={Math.min(spentPercentage, 100)} className={cn("h-3", isOverBudget ? "[&>div]:bg-destructive" : "")} />
          {isOverBudget && (
            <p className="text-xs text-destructive mt-1">
              You&apos;ve exceeded your budget by ${Math.abs(remaining).toLocaleString()}!
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
          <Pencil className="mr-1 h-4 w-4" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(category.id)}>
          <Trash2 className="mr-1 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
