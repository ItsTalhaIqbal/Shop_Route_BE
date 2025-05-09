import { User } from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body;
  
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: "Email already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error creating user", error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error during login", error: (error as Error).message });
  }
};

export const tokenAuth = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ auth: false, data: "No token found in request" });
    return;
  }

  try {
    const decrypt = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    res.status(200).json({ auth: true, data: decrypt });
  } catch (error: unknown) {
    res.status(401).json({ auth: false, data: "Invalid or expired token" });
  }
};
