
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@/types";
import { CATEGORY_ICONS } from "@/lib/constants";
import * as LucideIcons from 'lucide-react';
import { ScrollArea } from "../ui/scroll-area";

const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  budget: z.coerce.number().min(0, { message: "Budget must be a positive number." }),
  icon: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void;
  initialData?: Partial<Category>;
  isLoading?: boolean;
}

export function CategoryForm({ onSubmit, initialData, isLoading }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      budget: initialData?.budget || 0,
      icon: initialData?.icon || Object.keys(CATEGORY_ICONS)[0],
    },
  });

  const iconOptions = Object.entries(CATEGORY_ICONS).map(([key, value]) => ({
    value: value, // Lucide icon name string
    label: key.charAt(0).toUpperCase() + key.slice(1), // e.g. Food
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ScrollArea className="h-48">
                  {iconOptions.map((option) => {
                     const IconComponent = (LucideIcons[option.value as keyof typeof LucideIcons] as LucideIcons.LucideIcon || LucideIcons.Shapes);
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <IconComponent className="mr-2 h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={isLoading}>
          {isLoading ? "Saving..." : (initialData?.id ? "Save Changes" : "Add Category")}
        </Button>
      </form>
    </Form>
  );
}
