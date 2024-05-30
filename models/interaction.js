import { Schema, model } from "mongoose";

const interactionSchema = new Schema(
  {
    senderDogId:{
        type: Schema.Types.ObjectId,
        ref: "Dog",
        required: [true, "Dog reference is required"],
    },
    recipientDogId:{
        type: Schema.Types.ObjectId,
        ref: "Dog",
        required: [true, "Dog reference is required"],
    },
    message: {
        type: String,
        required: [true, 'Password is required']
    },
    InteractionStatus: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Interaction = model("interactions", interactionSchema);

export default Interaction;
