const express = require('express');
const { getAllMissions, getMission, addMission, updateMission, deleteMission, affecterMission } = require('../controllers/mission');
const router = express.Router();


router.get('/missions', getAllMissions)
router.get('/mission/:id', getMission)
router.post('/mission', addMission)
router.put('/mission/:id', updateMission)
router.put('/mission/:idEmployee/:idMission', affecterMission)
router.delete('/mission/:id', deleteMission)

module.exports = router