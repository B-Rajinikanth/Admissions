import Applicant from '../models/applicant.model.js'
import mongoose from 'mongoose'

export const getApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find({})
        res.status(200).json({ applicants })
    } catch (error) {
        console.error('Error in fetching data: ', error.message)
        res.status(500).json({ success: false, message: 'Server Error!' })
    }
}

export const getSingleApplicant = async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) {
          return res.status(404).json({ message: 'Applicant not found' });
        }
        res.status(200).json(applicant);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const createApplicant = async (req, res) => {
    const applicant = req.body

    if(!applicant.applicantName || !applicant.mobileNumber || !applicant.interMarks || !applicant.eapcetRank) {
        return res.status(400).json({ success: false, message: "Please provide all fields!!" })
    }

    const newApplicant = new Applicant(applicant)

    try {
        await newApplicant.save();
        res.status(201).json({ success: true, data: newApplicant })
    } catch (error) {
        console.error(`Error in creating applicant: ${error.message}`)
        res.status(500).json({ success: false, message: "Server Error!" })
    }
}

export const deleteApplicant = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ success: false, message: 'Invalid application ID!'})

    try {
        await Applicant.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Applicant deleted!' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error!' })
    }
}

export const updateApplicant = async (req, res) => {
    const {id} = req.params

    const applicant = req.body

    // if(!mongoose.Types.ObjectId.isValid(id))
    //     return res.status(404).json({ success: false, message: 'Invalid application ID!'})

    try {
        const updatedApplicant = await Applicant.findByIdAndUpdate(id, applicant, {new:true})
        res.status(200).json({ success: true, data: updatedApplicant })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error!' })
    }
}