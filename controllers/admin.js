
const Admin = require('../models/adminSchema')
const bcrypt = require('bcryptjs')
const { signAccessToken } = require('../middleware/auth');


exports.getAllAdmins = async (req, res) => {

    try {
        const data = await Admin.find()
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({ message: 'error server ' })
    }
}

exports.getAdmin = async (req, res) => {
    const data = await Admin.findById(req.params.id)
    res.status(200).send(data)
}

exports.addAdmin = async (req, res) => {
    try {
        const found = await Admin.findOne({ email: req.body.email })
        if (found) {
            res.status(400).send({ message: "Admin already exists !!" })
        }
        else {
            const data = await Admin.create(req.body)
            res.status(201).send(data)
            res.status(201).send({ message: "Admin is already created !!" })
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'error server ' })

    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        await Admin.findByIdAndUpdate(id, req.body);
        const updated = await Admin.findById(id)
        res.status(200).send(updated)

    } catch (error) {
        res.status(500).send({ message: 'error server ' })

    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        await Admin.findByIdAndDelete(id, req.body);
        res.status(200).send({ message: "Admin deleted" })

    } catch (error) {
        res.status(500).send({ message: 'error server ' })

    }
}


exports.register = async (req, res) => {
    try {
        const exist = await Admin.findOne({ email: req.body.email })
        if (exist) {
            res.status(400).send({ message: 'admin already exist' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const admin = new Admin({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPass,
            category: req.body.category,
            department: req.body.department,
        });

        await admin.save()
        res.status(201).send(admin)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

};


exports.login = async (req, res) => {

    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            res.status(400).send({ message: 'invalid email or password' })
        }

        const validPass = await bcrypt.compare(req.body.password, admin.password)
        if (!validPass) {
            res.status(400).send({ message: 'invalid email or password' })
        }

        const token = await signAccessToken(admin)
        res.status(200).send({ message: 'login successfull', token })
    } catch (error) {
        res.status(500).send({ message: "error server " })
    }

};