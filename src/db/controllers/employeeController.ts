import bcrypt from 'bcrypt';
import { fileURLToPath } from 'node:url';
import { Employee } from '../models/Employee';

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
	}
};

export default EmployeeController;
