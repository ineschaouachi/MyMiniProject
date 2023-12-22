const express = require('express');
const { getAllMissions, getMission, addMission, updateMission, deleteMission, affecterMission } = require('../controllers/mission');
const passport = require('passport')
const router = express.Router();


router.get('/missions', passport.authenticate('bearer', { session: false }), getAllMissions)
router.get('/mission/:id', passport.authenticate('bearer', { session: false }), getMission)
router.post('/mission', passport.authenticate('bearer', { session: false }), addMission)
router.put('/mission/:id', passport.authenticate('bearer', { session: false }), updateMission)
router.put('/mission/:idEmployee/:idMission', passport.authenticate('bearer', { session: false }), affecterMission)
router.delete('/mission/:id', passport.authenticate('bearer', { session: false }), deleteMission)

module.exports = router