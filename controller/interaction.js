import Interaction from "../models/interaction.js";
import User from "../models/user.js";
import Dog from "../models/dog.js";
import sendEmail from "../utils/nodemailer.js";

export const ownerInteraction = async (req, res) => {
  const { senderDogId, recipientDogId } = req.params;
  const senderDog = await Dog.findOne({ _id: senderDogId });
  const recipientDog = await Dog.findOne({ _id: recipientDogId });
  const sender = await Dog.findOne({ _id: senderDogId }).populate('ownerId');
  console.log(sender.ownerId.email);
  const recipient = await Dog.findOne({ _id: recipientDogId }).populate('ownerId')
  console.log(recipient.ownerId.email);

  if (!senderDog) {
    return res.status(404).json({
      message: "Dog does not exist",
    });
  }

  if (!recipientDog) {
    return res.status(404).json({
      message: "Dog does not exist",
    });
  }

  const message = `This is my whatApp number ${sender.ownerId.phoneNumber}`;

  sendEmail({
    email: recipient.ownerId.email,
    subject: "Dog connection alert",
    message
  });

  const interaction = await Interaction.create({
    senderDogId: senderDog.id,
    recipientDogId: recipientDog.id,
    message: `${senderDog.ownerId} interacted with ${recipientDog.ownerId} regarding ${senderDog.uniqueName}`,
    InteractionStatus: true
  });

return res.status(200).json({
    message: `Interaction started`,
    data: interaction
})
};
