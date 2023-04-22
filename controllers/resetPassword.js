const resetPasswordRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
const { PAGE_URL } = require('../config');
const nodemailer = require('nodemailer');


resetPasswordRouter.post('/', async (request, response) => {
    const { email } = request.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
        return response.status(400).json({error: 'El usuario no existe'});
    }

    const userForToken = {
        id: user.id
    };

    const resetToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    })

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, //true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, //generated ethereal user
            pass: process.env.EMAIL_PASS, //generated ethereal password
        },
    });
    
    await transporter.sendMail({
         from: process.env.EMAIL_USER, //sender address
         to: user.email, //list of receivers
         subject: 'Recuperar contraseña', // Subject Line
         html: `<a href="${PAGE_URL}/resetPassword/${resetToken}">Recuperar contraseña</a>`, //html body
    });
    
        return response.sendStatus(200);
    
    });
    
module.exports = resetPasswordRouter;