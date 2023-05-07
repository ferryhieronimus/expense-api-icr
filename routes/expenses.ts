import express, { Router } from "express";
import { expensesController } from "../controllers";

const router: Router = express.Router();

router.get("/expenses", expensesController.getAllExpenses);
router.get("/expenses/category", expensesController.getAllCategories);
router.get("/expenses/total", expensesController.getTotalExpenses);
router.get("/expenses/:id", expensesController.getExpenseById);
router.post("/expenses", expensesController.createExpense);
router.delete("/expenses/:id", expensesController.deleteExpenseById);
router.put("/expenses/:id", expensesController.editExpenseById);

export default router;
