const UserModel = require("../models/User.model");
const EducationModel = require("../models/Education.model");

const insertEducation = async (request, response) => {
  return await EducationModel.create(request.body)
    .then(async (createdEducation) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        user.education.unshift(createdEducation);
        return user
          .save()
          .then(() => {
            return response.json(createdEducation);
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

const getAllEducations = async (request, response) => {
  return await EducationModel.find()
    .then((educations) => {
      return response.json(educations);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getEducationById = async (request, response) => {
  return await EducationModel.findById(request.params.educationId)
    .then((education) => {
      return response.json(education);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const updateEducation = async (request, response) => {
  return await EducationModel.findById(request.params.educationId)
    .then(async (educationDetails) => {
      if (educationDetails) {
        if (request.body.educationLogo) {
          educationDetails.educationLogo = request.body.educationLogo;
        }
        if (request.body.period) {
          educationDetails.period = request.body.period;
        }
        if (request.body.schoolName) {
          educationDetails.schoolName = request.body.schoolName;
        }
        if (request.body.course) {
          educationDetails.course = request.body.course;
        }
        return await educationDetails
          .save()
          .then((updatedEducation) => {
            return response.json(updatedEducation);
          })
          .catch((error) => {
            return response.json(error);
          });
      } else {
        return response.json("Education not found");
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

const deleteEducationPermenently = async (request, response) => {
  return await EducationModel.findByIdAndDelete(request.params.educationId)
    .then(async (education) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        await user.education.splice(
          user.education.findIndex(
            (a) => a._id.toString() === education._id.toString()
          ),
          1
        );

        return await user
          .save()
          .then(() => {
            return response.json(education);
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
  insertEducation,
  getAllEducations,
  getEducationById,
  updateEducation,
  deleteEducationPermenently,
};
