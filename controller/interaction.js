import Interaction from "../models/interaction.js";
import User from "../models/user.js";
import Dog from "../models/dog.js";

export const ownerInteraction = async (req, res) => {
  const { senderDogId, recipientDogId } = req.params;
  const senderDog = await Dog.findOne({ _id: senderDogId });
  const recipientDog = await Dog.findOne({ _id: recipientDogId });
  const sender = await Dog.findOne({ _id: senderDogId }).populate('ownerId')._id;
  console.log(senderDog);
  const recipient = await Dog.findOne({ _id: recipientDogId }).populate('ownerId')._id;

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

  const interaction = await Interaction.create({
    senderDogId: senderDog.id,
    recipientDogId: recipientDog.id,
    message: `${senderDog.ownerId} interact with ${recipientDog.ownerId} regarding ${senderDog.uniqueName}`,
    InteractionStatus: true
  });

return res.status(200).json({
    message: `Interaction started`,
    data: interaction
})
};
