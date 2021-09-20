const connection = require('../config/database')
const axios = require('axios')

export const insertPharmacyRating = async (data) => {
    let query = 'INSERT INTO Rating (Rate_Pharmacy_ID, Rate_Pharmacy_Score, Rate_Pharmacy_Feedback, Rate_Patient_ID) '
    query += 'VALUES (?, ?, ?, ?);'

    try {
        const result = await connection.promise().execute(
            query,
            [ data.pharmacyId, data.score, data.feedback, data.patientId ]
        )
        return result[0].insertId
    } catch (error) {
        throw new Error(`Insert Pharmacy Rating: ${error.message}`)
    }
}

export const insertPharmacistRating = async (data) => {
    let query = 'INSERT INTO Rating (Rate_Pharmacist_ID, Rate_Pharmacist_Score, Rate_Pharmacist_Feedback, Rate_Patient_ID) '
    query += 'VALUES (?, ?, ?, ?);'

    try {
        const result = await connection.promise().execute(
            query,
            [ data.pharmacistId, data.score, data.feedback, data.patientId ]
        )
        return result[0].insertId
    } catch (error) {
        throw new Error(`Insert Pharmacist Rating: ${error.message}`)
    }
}

export const insertDriverRating = async (data) => {
    let query = 'INSERT INTO Rating (Rate_Driver_ID, Rate_Driver_Score, Rate_Driver_Feedback, Rate_Patient_ID) '
    query += 'VALUES (?, ?, ?, ?);'

    try {
        const result = await connection.promise().execute(
            query,
            [ data.driverId, data.score, data.feedback, data.patientId ]
        )
        return result[0].insertId
    } catch (error) {
        throw new Error(`Insert Driver Rating: ${error.message}`)
    }
}

export const getPharmacyRatingByPharmacyId = async (pharmacyId, authorizationToken) => {
    let query = 'SELECT ID, Rate_Timestamp, Rate_Pharmacy_ID, Rate_Pharmacy_Score, Rate_Pharmacy_Feedback, Rate_Patient_ID '
    query += 'FROM Rating '
    query += 'WHERE Rate_Pharmacy_ID = ? '
    query += 'ORDER BY Rate_Timestamp DESC;'

    try {
        let result = await connection.promise().execute(query, [ pharmacyId ])
        let ratings = result[0]

        if(ratings) {
            // Get patient name and profile image
            for (const index in ratings) {
                let patient = await axios.get(
                    `http://user-profile-service:8000/profile/${ratings[index].Rate_Patient_ID}`,
                    {
                        headers: {
                            Authorization: authorizationToken,
                        }
                    }
                )
                patient = patient.data.data
                ratings[index].patientName = `${patient.Psn_Fname} ${patient.Psn_Lname}`
                ratings[index].patientImage = patient.Psn_Image
            }
        }

        return ratings
    } catch (error) {
        throw new Error(`Get Pharmacy Rating By Pharmacy ID: ${error.message}`)
    }
}

export const getPharmacistRatingByPharmacistId = async (pharmacistId, authorizationToken) => {
    let query = 'SELECT ID, Rate_Timestamp, Rate_Pharmacist_ID, Rate_Pharmacist_Score, Rate_Pharmacist_Feedback, Rate_Patient_ID '
    query += 'FROM Rating '
    query += 'WHERE Rate_Pharmacist_ID = ? '
    query += 'ORDER BY Rate_Timestamp DESC;'

    try {
        let result = await connection.promise().execute(query, [ pharmacistId ])
        let ratings = result[0]

        if(ratings) {
            // Get patient name and profile image
            for (const index in ratings) {
                let patient = await axios.get(
                    `http://user-profile-service:8000/profile/${ratings[index].Rate_Patient_ID}`,
                    {
                        headers: {
                            Authorization: authorizationToken,
                        }
                    }
                )
                patient = patient.data.data
                ratings[index].patientName = `${patient.Psn_Fname} ${patient.Psn_Lname}`
                ratings[index].patientImage = patient.Psn_Image
            }
        }

        return ratings
    } catch (error) {
        throw new Error(`Get Pharmacist Rating By Pharmacist ID: ${error.message}`)
    }
}

export const getDriverRatingByDriverId = async (driverId, authorizationToken) => {
    let query = 'SELECT ID, Rate_Timestamp, Rate_Driver_ID, Rate_Driver_Score, Rate_Driver_Feedback, Rate_Patient_ID '
    query += 'FROM Rating '
    query += 'WHERE Rate_Driver_ID = ? '
    query += 'ORDER BY Rate_Timestamp DESC;'

    try {
        let result = await connection.promise().execute(query, [ driverId ])
        let ratings = result[0]

        if(ratings) {
            // Get patient name and profile image
            for (const index in ratings) {
                let patient = await axios.get(
                    `http://user-profile-service:8000/profile/${ratings[index].Rate_Patient_ID}`,
                    {
                        headers: {
                            Authorization: authorizationToken,
                        }
                    }
                )
                patient = patient.data.data
                ratings[index].patientName = `${patient.Psn_Fname} ${patient.Psn_Lname}`
                ratings[index].patientImage = patient.Psn_Image
            }
        }

        return ratings
    } catch (error) {
        throw new Error(`Get Driver Rating By Driver ID: ${error.message}`)
    }
}

export const getAvgPharmacyRatingByPharmacyId = async (pharmacyId) => {
    let query = 'SELECT Rate_Pharmacy_ID, TRUNCATE(AVG(Rate_Pharmacy_Score), 1) AS Avg_Score '
    query += 'FROM Rating '
    query += 'WHERE Rate_Pharmacy_ID = ? '
    query += 'GROUP BY Rate_Pharmacy_ID;'

    try {
        let result = await connection.promise().execute(query, [ pharmacyId ])
        return result[0][0]
    } catch (error) {
        throw new Error(`Get Avg Pharmacy Rating By Pharmacy ID: ${error.message}`)
    }
}

export const getAvgPharmacistRatingByPharmacistId = async (pharmacistId) => {
    let query = 'SELECT Rate_Pharmacist_ID, TRUNCATE(AVG(Rate_Pharmacist_Score), 1) AS Avg_Score '
    query += 'FROM Rating '
    query += 'WHERE Rate_Pharmacist_ID = ? '
    query += 'GROUP BY Rate_Pharmacist_ID;'

    try {
        let result = await connection.promise().execute(query, [ pharmacistId ])
        return result[0][0]
    } catch (error) {
        throw new Error(`Get Avg Pharmacist Rating By Pharmacist ID: ${error.message}`)
    }
}

export const getAvgDriverRatingByDriverId = async (driverId) => {
    let query = 'SELECT Rate_Driver_ID, TRUNCATE(AVG(Rate_Driver_Score), 1) AS Avg_Score '
    query += 'FROM Rating '
    query += 'WHERE Rate_Driver_ID = ? '
    query += 'GROUP BY Rate_Driver_ID;'

    try {
        let result = await connection.promise().execute(query, [ driverId ])
        return result[0][0]
    } catch (error) {
        throw new Error(`Get Avg Driver Rating By Driver ID: ${error.message}`)
    }
}