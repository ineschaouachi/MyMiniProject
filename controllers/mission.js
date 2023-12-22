const Mission = require('../models/missionSchema')
const Employee = require('../models/employeeSchema')
const nodemailer = require("nodemailer");


exports.getAllMissions = async (req, res) => {

    try {
        const data = await Mission.find()
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({ message: 'error server ' })
    }
}

exports.getMission = async (req, res) => {
    const data = await Mission.findById(req.params.id)
    res.status(200).send(data)
}

exports.addMission = async (req, res) => {
    try {
        const found = await Mission.findOne({ task: req.body.task })
        if (found) {
            res.status(400).send({ message: "Mission already exists !!" })
        }
        else {
            const data = await Mission.create(req.body)
            res.status(201).send(data)
            res.status(201).send({ message: "Mission is already created !!" })
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'error server ' })

    }
}

exports.updateMission = async (req, res) => {
    try {
        const id = req.params.id;
        await Mission.findByIdAndUpdate(id, req.body);
        const updated = await Mission.findById(id)
        res.status(200).send(updated)

    } catch (error) {
        res.status(500).send({ message: 'error server ' })

    }
}

exports.deleteMission = async (req, res) => {
    try {
        const id = req.params.id;
        await Mission.findByIdAndDelete(id, req.body);
        res.status(200).send({ message: "Mission deleted" })

    } catch (error) {
        res.status(500).send({ message: 'error server ' })

    }
}


exports.affecterMission = async (req, res) => {

    try {

        const dataEmployee = await Employee.findById(req.params.idEmployee)
        if (dataEmployee.availability) {
            await Mission.findByIdAndUpdate(req.params.idMission, {
                $push: { team: req.params.idEmployee }
            })

        }
        else {
            res.status(201).send({ message: "Employee not available" })

        }


        const dataMission = await Mission.findById(req.params.idMission)
        res.status(200).send({ message: "Tâche " + dataMission.task + " est affectée à " + dataEmployee.firstName + " " + dataEmployee.lastName })


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.adminEmail,
                pass: process.env.adminPass,
            },
        });
        const info = await transporter.sendMail({
            from: 'ines.chaouachi@esprit.tn', // sender address
            to: dataMission.team, // list of receivers
            subject: dataMission.task, // Subject line
            html: `<b>${dataMission.description}</b>`, // html body


        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })

    }

}
