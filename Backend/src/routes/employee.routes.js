import express from 'express';
import {
  addEmployee,
  updateEmployee,
  getEmployeeById,
  getAllEmployees,
  softDeleteEmployee,
  hardDeleteEmployee
} from '../controllers/employee.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/', verifyUser, addEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.patch('/:id/soft-delete', softDeleteEmployee);
router.delete('/:id/hard-delete', hardDeleteEmployee);

export default router;