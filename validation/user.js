import Joi from 'joi';

export const registerUserSchema = Joi.object().keys({
    fullname: Joi.string().min(3).max(20).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    gender: Joi.string().trim().valid('male', 'female').required(),
    phoneNumber: Joi.string().trim().required()
});

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().min(6).max(50).email().required(),
    password: Joi.string().trim().min(6).max(8).required()
});
