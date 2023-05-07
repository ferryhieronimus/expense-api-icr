import { RequestHandler } from "express";
import { expenses } from "../seeds/expenses";
import { categories } from "../seeds/category";
import { totalExpenses } from "../seeds/totalExpenses";
import { expenseSchema } from "../schemas/expense";
import { v4 as uuidv4 } from "uuid";

// get all expenses
const getAllExpenses: RequestHandler = (req, res) => {
  const params = req.query as {
    category_id: string;
    min_price: string;
    max_price: string;
  };

  let returnedExpenses = expenses.slice();

  const categoriesId = params.category_id?.split(",");
  const minPrice = parseInt(params.min_price);
  const maxPrice = parseInt(params.max_price);

  if (categoriesId) {
    const categoryNameIdMap: Record<string, string> = {};
    categories.forEach((c) => (categoryNameIdMap[c.name] = c.id));

    returnedExpenses = returnedExpenses.filter((exp) =>
      categoriesId.includes(categoryNameIdMap[exp.category])
    );
  }
  if (minPrice) {
    returnedExpenses = returnedExpenses.filter((exp) => exp.amount >= minPrice);
  }
  if (maxPrice) {
    returnedExpenses = returnedExpenses.filter((exp) => exp.amount <= maxPrice);
  }

  res.json(returnedExpenses).status(200);
};

// get categories
const getAllCategories: RequestHandler = (req, res) => {
  res.json(categories).status(200);
};

// get total expenses
const getTotalExpenses: RequestHandler = (req, res) => {
  res.json(totalExpenses).status(200);
};

// get expense by id
const getExpenseById: RequestHandler = (req, res) => {
  const id = req.params.id;
  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) {
    res.send(`Expense with id "${id}" not found`).status(404);
  } else {
    const category = categories.find((c) => c.name === expense.category);

    const returnedExpense = {
      ...expense,
      category: category,
    };
    res.json(returnedExpense).status(200);
  }
};

// create new expense
const createExpense: RequestHandler = (req, res) => {
  const expenseRequest = expenseSchema.parse(req.body);

  const category = categories.find((c) => c.id === expenseRequest.category);

  const expense = {
    id: uuidv4(),
    ...expenseRequest,
  };

  const returnedExpense = {
    ...expense,
    category: category,
  };

  expenses.push(expense);
  res.json(returnedExpense).status(201);
};

// delete expense
const deleteExpenseById: RequestHandler = (req, res) => {
  const id = req.params.id;
  const deletedExpenseIndex = expenses.findIndex(
    (expense) => expense.id === id
  );

  if (deletedExpenseIndex === -1) {
    res.send(`Expense with id "${id}" not found`).status(404);
  }

  expenses.splice(deletedExpenseIndex, 1);
  res.send(`Success delete expense with id "${id}"`).status(200);
};

// edit expense
const editExpenseById: RequestHandler = (req, res) => {
  const expenseRequest = expenseSchema.parse(req.body);

  const id = req.params.id;
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    res.send(`Expense with id "${id}" not found`).status(404);
  } else {
    const category = categories.find((c) => c.id === expenseRequest.category);

    if (!category) {
      res.send(`Category with category id "${id}" not found`).status(404);
    }

    const newExpense = {
      id,
      ...expenseRequest,
      category: category!.name,
    };

    const returnedExpense = {
      ...newExpense,
      category: category,
    };

    expenses[index] = newExpense;
    res.json(returnedExpense).status(200);
  }
};

export const expensesController = {
  getAllExpenses,
  getAllCategories,
  getTotalExpenses,
  getExpenseById,
  createExpense,
  deleteExpenseById,
  editExpenseById,
};
