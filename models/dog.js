import { Schema, model } from 'mongoose';

const dogSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Dog name is required'],
    trim: true
  },
  uniqueName: {
    type: String,
    required: [true, 'Dog name is required'],
    trim: true,
    unique: [true, 'Name aready taken']
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
    enum: ['male', 'female']
  },
  ownerId: {
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

export default Dog;
