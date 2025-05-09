import { Request, Response } from "express";
import { User } from "../models/User.model";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User doesn't exist" });
      return;
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    user.resetCode = resetCode;
    user.resetCodeExpiry = resetCodeExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL as string,
      subject: "Password Reset Verification Code",
      text: `Your password reset verification code is: ${resetCode}. It is valid for the next 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, code, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User doesn't exist!" });
      return;
    }

    if (user.resetCode !== code || !user.resetCodeExpiry || user.resetCodeExpiry < new Date()) {
      res.status(400).json({ message: "Invalid or expired verification code" });
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    user.password = encryptedPassword;
    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
