const express = require('express')
const { getAllAdmins, getAdmin, addAdmin, updateAdmin, deleteAdmin, register, login } = require('../controllers/admin');
const router = express.Router()



router.get('/admins', getAllAdmins)
router.get('/admin/:id', getAdmin)
router.post('/admin', addAdmin)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)

router.post('/register', register)
router.post('/login', login)



module.exports = router