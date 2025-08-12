import { NextResponse } from 'next/server';

const budgetCategories = [
    {
      id: 1,
      name: 'Groceries',
      icon: 'ShoppingBag',
      budget: 500,
      spent: 285.50,
      transactions: [
        { id: 1, name: 'SuperMart', amount: 120.75, category: 'Groceries' },
        { id: 2, name: 'Local Market', amount: 75.25, category: 'Groceries' },
        { id: 3, name: 'SuperMart', amount: 89.50, category: 'Groceries' },
      ],
    },
    {
      id: 2,
      name: 'Transport',
      icon: 'Bus',
      budget: 150,
      spent: 85.00,
      transactions: [
        { id: 1, name: 'Metro Pass', amount: 65.00, category: 'Transport' },
        { id: 2, name: 'Ride Share', amount: 20.00, category: 'Transport' },
      ],
    },
    {
        id: 3,
        name: 'Entertainment',
        icon: 'Film',
        budget: 200,
        spent: 124.99,
        transactions: [
            { id: 1, name: 'Movie Tickets', amount: 30.00, category: 'Entertainment' },
            { id: 2, name: 'Streaming Svc', amount: 14.99, category: 'Entertainment' },
            { id: 3, name: 'Concert', amount: 80.00, category: 'Entertainment' },
        ],
    },
     {
      id: 4,
      name: 'Dining Out',
      icon: 'Utensils',
      budget: 250,
      spent: 180.25,
      transactions: [
        { id: 1, name: 'The Great Cafe', amount: 45.50, category: 'Dining Out' },
        { id: 2, name: 'Pizza Place', amount: 30.00, category: 'Dining Out' },
        { id: 3, name: 'Local Restaurant', amount: 104.75, category: 'Dining Out' },
      ],
    },
];

const transactionHistory = budgetCategories.flatMap(c => c.transactions);

export async function GET() {
  // In the future, this will fetch data from MongoDB
  return NextResponse.json(transactionHistory);
}

export async function POST(request: Request) {
    const newTransaction = await request.json();
    // In the future, this will add a new transaction to MongoDB
    console.log('New transaction to add:', newTransaction);
    return NextResponse.json({ message: "Transaction added successfully", transaction: newTransaction }, { status: 201 });
}
