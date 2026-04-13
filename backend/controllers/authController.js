const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crypto = require("crypto");
const nodemailer = require("nodemailer");


// REGISTER
exports.register = async (req, res) => {

 try {

  const { name, email, phone, password } = req.body;

  const hashedPassword =
  await bcrypt.hash(password, 10);

  await db.query(

   'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',

   [name, email, phone, hashedPassword]

  );

  res.json({

   message: "User registered successfully"

  });

 }

 catch (error) {

  res.status(500).json({

   error: error.message

  });

 }

};



// LOGIN
exports.login = async (req, res) => {

 try {

  const { email, password } = req.body;

  const [users] = await db.query(

   'SELECT * FROM users WHERE email = ?',

   [email]

  );

  if (users.length === 0) {

   return res.status(400).json({

    message: "User not found"

   });

  }

  const user = users[0];

  const isMatch =
  await bcrypt.compare(password, user.password);

  if (!isMatch) {

   return res.status(400).json({

    message: "Invalid password"

   });

  }

  const token = jwt.sign(

   { id: user.id },

   process.env.JWT_SECRET,

   {

    expiresIn:
    process.env.JWT_EXPIRE

   }

  );

  res.json({

   message: "Login successful",

   token

  });

 }

 catch (error) {

  res.status(500).json({

   error: error.message

  });

 }

};



// GET LOGGED USER
exports.getMe = async (req, res) => {

 try {

  const [user] = await db.query(

   'SELECT id, name, email, phone FROM users WHERE id = ?',

   [req.user.id]

  );

  res.json(user[0]);

 }

 catch (error) {

  res.status(500).json({

   error: error.message

  });

 }

};



// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {

 try {

  const { email } = req.body;

  const [user] = await db.query(

   "SELECT * FROM users WHERE email = ?",

   [email]

  );

  if (user.length === 0) {

   return res.status(400).json({

    message: "User not found"

   });

  }


  // generate token
  const resetToken =
  crypto.randomBytes(32).toString("hex");


  // save token
  await db.query(

   "UPDATE users SET reset_token = ? WHERE email = ?",

   [resetToken, email]

  );


  // email config
  const transporter =
  nodemailer.createTransport({

   service: "gmail",

   auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

   }

  });


  // IMPORTANT
  const resetLink =
  `http://localhost:3000/reset-password/${resetToken}`;


  // send mail
  await transporter.sendMail({

   to: email,

   subject: "Password Reset",

   html:
   `
   <h3>Password Reset</h3>

   <p>Click link below:</p>

   <a href="${resetLink}">
   ${resetLink}
   </a>
   `

  });


  res.json({

   message:
   "Reset link sent to email"

  });

 }

 catch (error) {

  res.status(500).json({

   error: error.message

  });

 }

};



// RESET PASSWORD
exports.resetPassword = async (req, res) => {

 try {

  const { token } = req.params;

  const { password } = req.body;


  const hashedPassword =
  await bcrypt.hash(password, 10);


  const [result] = await db.query(

   `UPDATE users

    SET password = ?,
        reset_token = NULL

    WHERE reset_token = ?`,

   [hashedPassword, token]

  );


  if (result.affectedRows === 0) {

   return res.status(400).json({

    message: "Invalid token"

   });

  }


  res.json({

   message:
   "Password reset successful"

  });

 }

 catch (error) {

  res.status(500).json({

   error: error.message

  });

 }

};