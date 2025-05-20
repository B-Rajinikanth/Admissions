import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import applicantRoutes from './routes/applicant.route.js'
import cors from 'cors';


const PORT = process.env.PORT || 5555

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors());
app.use('/applicants', applicantRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port: ${PORT}`)
})


// appsatsuh

// mongodb+srv://rajinikanthb:appsatsuh@cluster0.woxhs0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0