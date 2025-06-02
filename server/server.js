import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import applicantRoutes from './routes/applicant.route.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';


const PORT = process.env.PORT || 5555

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'https://admissions-frontend-b7na.onrender.com'
}));
app.use(cors());
app.use('/applicants', applicantRoutes)
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port: ${PORT}`)
})


// appsatsuh
