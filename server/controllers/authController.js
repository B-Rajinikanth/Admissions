import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, empID, mobile, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ name, empID, mobile, email, password: hashedPassword, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'User already exists' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log input
    console.log("Login request:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email: user.email } });

  } catch (err) {
    console.error("Login error:", err); // This shows the exact cause
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};