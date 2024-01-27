const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const pool = require('../db');


router.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
    res.redirect("http://localhost:5173");
});

router.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("http://localhost:5173");
})

router.get('/google',
  passport.authenticate('google', { 
    scope: ['email', 'profile']
    })
);

router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173', 
    failureRedirect: '/login/failed' 
}));

router.post("/register", [
    // Validation rules
    body('username', 'Username is required').notEmpty().escape(),
    body('display_name', 'Display name is required').notEmpty().escape(),
    body('password', 'Password is required').notEmpty().escape(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    // More validation rules can be added as needed
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return them as response
      return res.status(400).json({ errors: errors.array() });
    }

    let { username, display_name, password} = req.body;

    console.log({
      username,
      display_name,
      password
    });

    if (!username || !display_name || !password) {
        return res.status(400).json({message: "Please enter all fields"});
    }

    try {
        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);
        // Kullanıcıyı veritabanına ekle
        const newUser = await pool.query(
            'INSERT INTO users (username, password_hash, display_name) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, display_name] // Kullanıcı adı olarak 'name' kullanıldı, gerektiğinde değiştirilebilir
        );
        // Başarılı kayıt
        res.status(201).json({ user: newUser.rows[0] });
    } catch (error) {
        if (error.code === '23505') { // Benzersizlik ihlali (e.g., email already exists)
            return res.status(409).json({ message: "User already exists." });
        }
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;