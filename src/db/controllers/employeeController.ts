import bcrypt from 'bcrypt';
import { Employee, IEmployee } from '../models/Employee';

/*
	EmployeeController controls the flow of operation  and connects the api end-points to the database
	Handles GetAll, Get1, Post, Put, Delete, and Login
*/

const EmployeeController = {
	EmployeeGetAll: async () => {
		try {
			const employeeList = await Employee.find()
				.sort({ firstName: 'asc' })
				.populate('events')
				.populate('blogPosts')
				.exec();

			return employeeList;
		} catch (err) {
			console.error(err);
		}
	},
	EmployeeAdd: async (newItem: IEmployee) => {
		let salt = bcrypt.genSaltSync(10);

		let hashedPassword = bcrypt.hashSync(newItem.password, salt);

		newItem.password = hashedPassword;
		try {
			let employee = await Employee.create(newItem);
			if (employee) {
				return employee;
			}
		} catch (error) {
			return error.message;
		}
	}
};

export default EmployeeController;
