import { Schema, model } from "mongoose";

const interactionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    dog:{
        type: Schema.Types.ObjectId,
        ref: "Dog",
        required: [true, "User reference is required"],
    },
    message: {
        type: String,
        required: [true, 'Password is required']
    }
  },
  {
    timestamps: true,
  }
);

const Dog = model("Interaction", interactionSchema);

export default Interaction;
