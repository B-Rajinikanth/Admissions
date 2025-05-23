import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    empID: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
