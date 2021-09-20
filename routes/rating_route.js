const express = require('express')
const router = express.Router()
const ratingService = require('../services/rating_service') 

// Insert pharmacy rating and review
router.post('/pharmacy', async (req, res) => {
    try {
        const result = await ratingService.insertPharmacyRating(req.body)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Insert pharmacist rating and review
router.post('/pharmacist', async (req, res) => {
    try {
        const result = await ratingService.insertPharmacistRating(req.body)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Insert driver rating and review
router.post('/driver', async (req, res) => {
    try {
        const result = await ratingService.insertDriverRating(req.body)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get all pharmacy rating and review by pharmacy id
router.get('/pharmacy/:pharmacyId', async (req, res) => {
    const authorizationToken = req.headers.authorization
    try {
        const result = await ratingService.getPharmacyRatingByPharmacyId(req.params.pharmacyId, authorizationToken)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get all pharmacist rating and review by pharmacist id
router.get('/pharmacist/:pharmacistId', async (req, res) => {
    const authorizationToken = req.headers.authorization
    try {
        const result = await ratingService.getPharmacistRatingByPharmacistId(req.params.pharmacistId, authorizationToken)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get all driver rating and review by driver id
router.get('/driver/:driverId', async (req, res) => {
    const authorizationToken = req.headers.authorization
    try {
        const result = await ratingService.getDriverRatingByDriverId(req.params.driverId, authorizationToken)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get Average Pharmacy rating by pharmacy id
router.get('/pharmacy/:pharmacyId/average', async (req, res) => {
    try {
        const result = await ratingService.getAvgPharmacyRatingByPharmacyId(req.params.pharmacyId)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get Average Pharmacist rating by pharmacist id
router.get('/pharmacist/:pharmacistId/average', async (req, res) => {
    try {
        const result = await ratingService.getAvgPharmacistRatingByPharmacistId(req.params.pharmacistId)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Get Average Driver rating by driver id
router.get('/driver/:driverId/average', async (req, res) => {
    try {
        const result = await ratingService.getAvgDriverRatingByDriverId(req.params.driverId)
        return res.status(200).json({ data: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router