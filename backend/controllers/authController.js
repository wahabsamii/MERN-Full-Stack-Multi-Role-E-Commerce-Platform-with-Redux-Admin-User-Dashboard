import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const register = async(req,res) => {
    const {name, email, password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if (checkUser) {
            return res.json({success: true, message: "Login please your account already created"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.json({success: true, user});

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
  console.log("re");
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "sdsdsdsdsds", {
      expiresIn: "7d", 
    });

   
    res.cookie("accessToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    
    return res.status(200).json({
      success: true,
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};


export const logout = async (req, res) => {
  try {
    // Clear the access token cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};


export const getAllUsers = async(req,res) => {
  try {
    const users = await User.find();
    return res.json({success: true, users});
  } catch (error) {
    console.log(error);
  }
}

export const UpdateUser = async (req, res) => {
  const { id, name, email, phone, address } = req.body;

  try {
    // ✅ Find user by ID and update (or add new fields if missing)
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          phone,
          address,
        },
      },
      { new: true, runValidators: true } // return updated user
    );

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user,
      message: "Profile Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
