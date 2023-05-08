import express, { Router } from "express";
import { expensesController } from "../controllers";

const router: Router = express.Router();

router.get("/expense", expensesController.getAllExpenses);
router.get("/expense/category", expensesController.getAllCategories);
router.get("/expense/total", expensesController.getTotalExpenses);
router.get("/expense/:id", expensesController.getExpenseById);
router.post("/expense", expensesController.createExpense);
router.delete("/expense/:id", expensesController.deleteExpenseById);
router.put("/expenses/:id", expensesController.editExpenseById);

export default router;
