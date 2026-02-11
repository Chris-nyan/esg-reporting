const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const prisma = require('../config/db');
const emailService = require('../services/emailService');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 1. Google Auth Implementation
exports.googleAuth = async (req, res) => {
  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { credential } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { 
          email, 
          name, 
          googleId, 
          isVerified: true,
          // avatarUrl: picture // Only uncomment if you added this to your Prisma schema!
        }
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });

  } catch (error) {
    console.error("GOOGLE VERIFY ERROR:", error.message);
    res.status(401).json({ 
      message: "Google Authentication failed", 
      error: error.message 
    });
  }
};

// 2. Email Verification Implementation
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await prisma.user.findFirst({ where: { verificationToken: token } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null }
    });

    res.status(200).send("<h1>Email Verified Successfully!</h1><p>You can now log in.</p>");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 3. Manual Signup Implementation
exports.signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
        isVerified: false
      }
    });

    // Send the production email via SendGrid
    await emailService.sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "User created. Please check your email to verify." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};