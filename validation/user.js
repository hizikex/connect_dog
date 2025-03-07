import Joi from 'joi';

export const registerUserSchema = Joi.object().keys({
    fullname: Joi.number().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    gender: Joi.string().trim().valid('male', 'female').required(),
    phoneNumber: Joi.string().trim().required(),
});
