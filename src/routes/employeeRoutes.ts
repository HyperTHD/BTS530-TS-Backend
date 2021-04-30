import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import EmployeeController from '../db/controllers/employeeController';

const employeeRouter: express.Router = express.Router();

employeeRouter.get('/', async (req: express.Request, res: express.Response) => {
	const list = await EmployeeController.EmployeeGetAll();
	if (!list) {
		res.status(500).json({ message: "Couldn't get any employees" });
	}
	res.status(200).json(list);
});

employeeRouter.get('/:id', async (req: express.Request, res: express.Response) => {
	try {
		const employee = await EmployeeController.EmployeeGetById(req.params.id);
		if (employee) {
			res.status(200).json(employee);
		} else {
			res.status(404).json({ message: "Couldn't find employee" });
		}
	} catch (error) {
		res.status(503).json({ message: error.message });
	}
});

employeeRouter.post('/', async (req: express.Request, res: express.Response) => {
	try {
		const newEmployee = await EmployeeController.EmployeeAdd(req.body);
		if (newEmployee) {
			res.status(201).json(newEmployee);
		} else {
			res.status(400).json({ message: "Bad data was given, couldn't create employee" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

employeeRouter.post('/login', async (req: express.Request, res: express.Response) => {
	try {
		const loginEmployee = await EmployeeController.EmployeeLogin(req.body);
		if (loginEmployee) {
			let payload = {
				_id: loginEmployee._id,
				username: loginEmployee.username,
				password: loginEmployee.password
			};
			const token = jwt.sign(payload, config.jwtSecretKey);
			res.status(200).json({ message: 'Login was successful', token: token });
		} else {
			res.status(400).json({ message: "Bad data was given, couldn't login sadly" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

employeeRouter.put('/:id', async (req: express.Request, res: express.Response) => {
	try {
		const updatedEmployee = await EmployeeController.EmployeeUpdate(req.body);
		if (updatedEmployee) {
			res.status(200).json(updatedEmployee);
		} else {
			res.status(400).json({ message: "Bad data was given, couldn't update employee" });
		}
	} catch (error) {
		res.status(503).json({ message: error.message });
	}
});

employeeRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
	try {
		await EmployeeController.EmployeeDelete(req.params.id);
		return res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default employeeRouter;
