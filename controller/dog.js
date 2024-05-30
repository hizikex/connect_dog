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


export const findDogByUniqueName = async (req, res) => {
    try {
      const { uniqueName } = req.params;
      const dog = await Dog.findOne({uniqueName: uniqueName});

      if (!dog) {
        return res.status(404).json({
          message: 'Dog not found'
        })
      }
  
      return res.status(200).json({
        message: `Hi ${dog.uniqueName}`,
        data: dog
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  
  export const findDogs = async (req, res) => {
    const allDogs = await Dog.find();
  
    res.status(200).json({
      message: 'All dog owners',
      data: allDogs
    });
  };
  