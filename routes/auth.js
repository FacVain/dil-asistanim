const router = require('express').Router();
const passport = require('passport');

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

module.exports = router;