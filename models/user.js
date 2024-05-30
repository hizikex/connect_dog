import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'FirstName is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    username: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
      },
},
{
    timestamps: true
});

const User = model('users', userSchema);

export default User