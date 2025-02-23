import express from 'express';
import {createEmployee} from '../controllers/employees/createEmployee.controller.js';
import {deleteEmployee} from '../controllers/employees/deleteEmployee.controller.js';
import {getEmployee} from '../controllers/employees/getEmployee.controller.js';
import {getEmployees} from '../controllers/employees/getEmployees.controller.js';
import {updateEmployee} from '../controllers/employees/updateEmployee.controller.js';
import validateEmployee from '../middlewares/validateEmployee.js';

const Router = express.Router();

Router.get('/', getEmployees);

Router.get('/:id', getEmployee);

Router.post('/', validateEmployee, createEmployee);

Router.patch('/:id', validateEmployee, updateEmployee);

Router.delete('/:id', deleteEmployee);

export default Router;
