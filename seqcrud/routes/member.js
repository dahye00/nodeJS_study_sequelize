const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/sign_up', function(req, res, next) {
    res.render('member/signup');
});

router.post('/sign_up', function(req, res, next) {
    let body = req.body;

    models.member.create({
        name: body.memberName,
        email: body.memberEmail,
        password: body.password
    })
    .then(result => {
        res.redirect('/member/sign_up');
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;
