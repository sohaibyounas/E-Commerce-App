const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { createNotification } = require("./notificationService");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({ name, email, password });

  // Generate email verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send confirmation email
  const verificationURL = `${process.env.CLIENT_URL || "http://localhost:5173"}/verify-email?token=${verificationToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Welcome! Confirm Your Email - E-Commerce",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6366f1;">Welcome to E-Commerce, ${user.name}!</h2>
          <p>Your account has been created successfully.</p>
          <p>Please click the button below to verify your email address:</p>
          <a href="${verificationURL}" style="display: inline-block; background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0;">Verify Email Address</a>
          <p style="color: #64748b; font-size: 14px;">If you did not create this account, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">This verification link expires in 24 hours.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    // Don't block registration if email fails
  }

  // Create notification for admin
  try {
    await createNotification({
      type: "user_registered",
      title: "New User Registered",
      message: `${user.name} (${user.email}) has created a new account.`,
      user: user._id,
    });
  } catch (err) {
    console.error("Notification creation failed:", err.message);
  }

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
    token,
  };
};

const loginUser = async ({ email, password }) => {
  // Password explicit select karna hoga kyunki schema mein select: false hai
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const verifyEmail = async (token) => {
  const crypto = require("crypto");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) {
    const error = new Error("Invalid or expired verification token");
    error.statusCode = 400;
    throw error;
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
};
