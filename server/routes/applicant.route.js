import express from 'express'
import { getApplicants, createApplicant, deleteApplicant, updateApplicant, getSingleApplicant } from '../controllers/applicant.controller.js'

const router = express.Router()

router.post('/', createApplicant)      // C ---> Create
router.get('/', getApplicants)         // R ---> Read
router.get('/:id', getSingleApplicant) // R ---> Read
router.put('/:id', updateApplicant)    // U ---> Update
router.delete('/:id', deleteApplicant) // D ---> Delete

export default router;