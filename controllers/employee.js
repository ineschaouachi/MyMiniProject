
const Employee = require('../models/employeeSchema')



exports.getAllEmployees = async (req, res) => {

    try {
        const data = await Employee.find()
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({ message: 'error server ' })
    }
}

exports.getEmployee = async (req, res) => {
    const data = await Employee.findById(req.params.id)
    res.status(200).send(data)
}

exports.addEmployee = async (req, res) => {
    try {
        const found = await Employee.findOne({ numCnss: req.body.numCnss })
        if (found) {
            res.status(400).send({ message: "Employee already exists !!" })
        }
        else {
            const data = await Employee.create(req.body)
            res.status(201).send(data)
            res.status(400).send({ message: "Employee is already created" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'error server ' })

    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndUpdate(id, req.body);
        const updated = await Employee.findById(id)
        res.status(200).send(updated)

    } catch (error) {
        res.status(500).send({ message: 'error server ' })

    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndDelete(id, req.body);
        res.status(200).send({ message: "Employee deleted" })

    } catch (error) {
        res.status(500).send({ message: 'error server ' })

    }
}


