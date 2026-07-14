import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: "Login successful",
      ...result
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }

};

export const me = async (req, res) => {

  res.json({
    success: true,
    user: req.user
  });

};