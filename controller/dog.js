import Dog from '../models/dog.js'

export const registerDog = async (req, res) => {
    try {
        const user = req.user;

        const {
            name,
            age,
            breed,
            gender,
            uniqueName,
            bio,
            location,
            likes,
            dislikes,
            profilePicture
        } = req.body;

        const sex = gender.toLowerCase();

        const newDog = new Dog({
            name,
            age,
            breed,
            gender: sex,
            uniqueName,
            ownerId: user.id,
            bio,
            location,
            likes,
            dislikes,
            profilePicture
        });

        await newDog.save();

        res.status(200).json({
            message: 'New dog added',
            data: newDog
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
};
