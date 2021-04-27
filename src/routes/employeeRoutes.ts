import express from 'express';
import jwt from 'jsonwebtoken';
import strategy from '../config/passportStrategy';
import EmployeeController from '../db/controllers/employeeController';

const employeeRouter: express.Router = express.Router();

employeeRouter.get('/', async (req: express.Request, res: express.Response) => {
	const list = await EmployeeController.EmployeeGetAll();
	if (!list) {
		res.status(500).json({ message: "Couldn't get any employees" });
	}
	res.status(200).json(list);
});

export default employeeRouter;
