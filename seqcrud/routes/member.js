const express = require('express');
const models = require('../models');
const crypto = require('crypto');
const router = express.Router();

router.get('/sign_up', function(req, res, next) {
    res.render('member/signup');
});

router.post('/sign_up', function(req, res, next) {
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + '';
    let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

    models.member.create({
        name: body.memberName,
        email: body.memberEmail,
        password: hashPassword,
        salt: salt
    })
    .then(result => {
        res.redirect('/member/sign_up');
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;
