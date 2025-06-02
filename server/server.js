import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import applicantRoutes from './routes/applicant.route.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const PORT = process.env.PORT || 5555

dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())

// Allow requests from your frontend domain
app.use(cors({
  origin: 'https://admissions-frontend-b7na.onrender.com'
}));
app.use(cors());
app.use('/applicants', applicantRoutes)
app.use('/auth', authRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port: ${PORT}`)
})


// appsatsuh
