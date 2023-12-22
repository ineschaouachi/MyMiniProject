const express = require('express');
const { getAllEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee');
const passport = require('passport')
const router = express.Router();


router.get('/employees', passport.authenticate('bearer', { session: false }), getAllEmployees)
router.get('/employee/:id', passport.authenticate('bearer', { session: false }), getEmployee)
router.post('/employee', passport.authenticate('bearer', { session: false }), addEmployee)
router.put('/employee/:id', passport.authenticate('bearer', { session: false }), updateEmployee)
router.delete('/employee/:id', passport.authenticate('bearer', { session: false }), deleteEmployee)

module.exports = router