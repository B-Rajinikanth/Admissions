import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    applicationNumber: { type: Number },
    applicantName: { type: String, required: true },
    mobileNumber: {type: Number, required: true },
    interMarks: { type: Number, required: true },
    eapcetRank: { type: Number, required: true },
    sucetMarks: { type: Number },
    feePayable: { type: Number },
    isAllotmentReleased: { type: Boolean },
    isJoined: { type: Boolean },
    department: { type: String },
    remarks: { type: String }
}, {
    timestamps: true
});

const Applicant = mongoose.model('Applicant', applicantSchema)

export default Applicant;