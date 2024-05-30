import { Schema, model } from 'mongoose';

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dog name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: 0
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  ownerName: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: [String],
    default: []
  },
  dislikes: {
    type: [String],
    default: []
  },
  profilePicture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Dog = model('Dog', dogSchema);

module.exports = Dog;
