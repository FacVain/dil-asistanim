const router = require('express').Router();
const passport = require('passport');

router.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: "failure",
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
    res.clearCookie('connect.sid'); 
	req.logout(function(err) {
		if(err) console.log(err);
		req.session.destroy(function (err) { // destroys the session
			res.send();
		});
	});
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

module.exports = router;