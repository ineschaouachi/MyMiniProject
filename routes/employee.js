const express = require('express');
const { getAllEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee');
const router = express.Router();


router.get('/employees', getAllEmployees)
router.get('/employee/:id', getEmployee)
router.post('/employee', addEmployee)
router.put('/employee/:id', updateEmployee)
router.delete('/employee/:id', deleteEmployee)

module.exports = router