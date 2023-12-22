const express = require('express')
const { getAllAdmins, getAdmin, addAdmin, updateAdmin, deleteAdmin, register, login } = require('../controllers/admin');
const passport = require('passport')
const router = express.Router()

router.get('/admins', passport.authenticate('bearer', { session: false }), getAllAdmins)
router.get('/admin/:id', passport.authenticate('bearer', { session: false }), getAdmin)
router.post('/admin', passport.authenticate('bearer', { session: false }), addAdmin)
router.put('/admin/:id', passport.authenticate('bearer', { session: false }), updateAdmin)
router.delete('/admin/:id', passport.authenticate('bearer', { session: false }), deleteAdmin)

router.post('/register', register)
router.post('/login', login)


module.exports = router