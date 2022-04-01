const UserModel = require("../models/User.model");
const ExperienceModel = require("../models/Experience.model");

const insertExperience = async (request, response) => {
  return await ExperienceModel.create(request.body)
    .then(async (createdExperience) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        user.experience.unshift(createdExperience);
        return user
          .save()
          .then(() => {
            return response.json(createdExperience);
          })
          .catch((error) => {
            return response.json(error);
          });
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getAllExperience = async (request, response) => {
  return await ExperienceModel.find()
    .then((experiences) => {
      return response.json(experiences);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getExperienceById = async (request, response) => {
  return await ExperienceModel.findById(request.params.experienceId)
    .then((experience) => {
      return response.json(experience);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const updateExperience = async (request, response) => {
  return await ExperienceModel.findById(request.params.experienceId)
    .then(async (experienceDetails) => {
      if (experienceDetails) {
        if (request.body.companyLogo) {
          experienceDetails.companyLogo = request.body.companyLogo;
        }
        if (request.body.position) {
          experienceDetails.position = request.body.position;
        }
        if (request.body.companyName) {
          experienceDetails.companyName = request.body.companyName;
        }
        if (request.body.description) {
          experienceDetails.description = request.body.description;
        }
        return await experienceDetails
          .save()
          .then((updatedExperience) => {
            return response.json(updatedExperience);
          })
          .catch((error) => {
            return response.json(error);
          });
      } else {
        return response.json("Experience not found");
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

const deleteExperiencePermenently = async (request, response) => {
  return await ExperienceModel.findByIdAndDelete(request.params.experienceId)
    .then(async (experience) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        await user.experience.splice(
          user.experience.findIndex(
            (a) => a._id.toString() === experience._id.toString()
          ),
          1
        );

        return await user
          .save()
          .then(() => {
            return response.json(experience);
          })
          .catch((error) => {
            return response.json(error);
          });
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

module.exports = {
  insertExperience,
  getAllExperience,
  getExperienceById,
  updateExperience,
  deleteExperiencePermenently,
};
