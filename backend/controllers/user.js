const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "583658858550-mc1n9c3ha94v9n87ifut6kfdi4aanh2d.apps.googleusercontent.com"
);
const register = async (req, res) => {
  const { firstName, lastName, email, password, country, created_at } =
    req.body;
  const role_id = "2"; // edit the value of role_id depend on role id in role table .
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users (firstName, lastName,email ,password ,country, role_id, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  const data = [
    firstName,
    lastName,
    email.toLowerCase(),
    encryptedPassword,
    country,
    role_id,
    created_at,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

// function getUsers
const getUsers = (req, res) => {
  try {
    pool
      .query("select * from users where is_deleted=0 ")
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "all users",
          result: result.rows,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: "Server Error", err: err });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", err: err });
  }
};
// function getUserById
const getUserById = (req, res) => {
  // access the userid in params
  const userId = req.params.userId;
  try {
    pool
      .query("select * from users where is_deleted=0 and id=$1", [userId])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "user",
          result: result.rows,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: "Server Error", err: err });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", err: err });
  }
};

// function deleteUserById
// update  users set is_deleted=0 where id=6
const deleteUserById = (req, res) => {
  const userId = req.params.userId;
  try {
    pool
      .query("update  users set is_deleted=1 where id=$1", [userId])
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Deleted User",
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: "Server Error", err: err });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", err: err });
  }
};
const generateUserToken = (user) => {
  const payload = {
    userId: user.id, // Add any relevant information here
    email: user.email, // Example: Add email to payload
  };

  const secretKey = "yourSecretKey"; // Replace with your own secret key

  // Generate JWT with payload and secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
  return token;
};
// const login with google
const loginGoogle = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "583658858550-mc1n9c3ha94v9n87ifut6kfdi4aanh2d.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    console.log("User Info:", payload);

    // Check if the user exists in your database
    const email = payload.email.toLowerCase();
    // Query to find if the user already exists
    const userQuery = `SELECT * FROM users WHERE email = $1`;
    const existingUser = await pool.query(userQuery, [email]);

    if (existingUser.rows.length === 0) {
      // User does not exist, so we register them
      const firstName = payload.given_name;
      const lastName = payload.family_name;
      const country = payload.locale; // You can use a different field if needed
      const created_at = new Date(); // Set the current date for the user creation

      // Now we register the user using your existing register logic
      const role_id = "2"; // Set the role_id as needed
      const encryptedPassword = ""; // Google login doesn't require a password, so this can be null

      const query = `INSERT INTO users (firstName, lastName, email, password, country, role_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const data = [
        firstName,
        lastName,
        email,
        encryptedPassword,
        country,
        role_id,
        created_at,
      ];

      const result = await pool.query(query, data);

      const newUser = result.rows[0];

      // Generate a token for the new user
      const userToken = generateUserToken(newUser); // Example: Generate JWT
      return res.json({ token: userToken, userId: newUser.id });
    }

    // If user exists, return a token for the existing user
    const userToken = generateUserToken(existingUser.rows[0]); // Example: Generate JWT
    res.json({ token: userToken, userId: existingUser.rows[0].id });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Invalid Google token" });
  }
};
module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  deleteUserById,
  loginGoogle,
};
