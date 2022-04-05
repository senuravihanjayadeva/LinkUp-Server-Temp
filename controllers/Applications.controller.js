const UserModel = require("../models/User.model");
const ApplicationModel = require("../models/Applications.model");
const JobModel = require("../models/Jobs.model");

const insertApplication = async (request, response) => {
  request.body.status = "PENDING";
  request.body.userId = request.params.userId;
  request.body.job = {
    _id: request.body.jobId,
  };
  return await ApplicationModel.create(request.body)
    .then(async (createdApplication) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        user.applicationList.unshift(createdApplication);
        return user
          .save()
          .then(async () => {
            const job = await JobModel.findById(request.body.jobId);
            if (job) {
              job.applications.unshift(createdApplication);
              return job
                .save()
                .then(() => {
                  return response.json(createdApplication);
                })
                .catch((error) => {
                  return response.json(error);
                });
            }
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

const getAllApplications = async (request, response) => {
  return await ApplicationModel.find()
    .populate({ path: "job", model: "Jobs" })
    .then((applications) => {
      return response.json(applications);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getApplicationById = async (request, response) => {
  return await ApplicationModel.findById(request.params.applicationId).populate({ path: "job", model: "Jobs" })
    .then((application) => {
      return response.json(application);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getApplicationByUserId = async (request, response) => {
  return await ApplicationModel.find({ userId: request.params.userId }).populate({ path: "job", model: "Jobs" })
    .then((application) => {
      return response.json(application);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const updateApplication = async (request, response) => {
  return await ApplicationModel.findById(request.params.applicationId)
    .then(async (applicationDetails) => {
      if (applicationDetails) {
        if (request.body.applicantName) {
          applicationDetails.applicantName = request.body.applicantName;
        }
        if (request.body.nic) {
          applicationDetails.nic = request.body.nic;
        }
        if (request.body.contactNumber) {
          applicationDetails.contactNumber = request.body.contactNumber;
        }
        if (request.body.university) {
          applicationDetails.university = request.body.university;
        }
        if (request.body.skills) {
          applicationDetails.skills = request.body.skills;
        }
        if (request.body.languages) {
          applicationDetails.languages = request.body.languages;
        }
        if (request.body.linkedIn) {
          applicationDetails.linkedIn = request.body.linkedIn;
        }
        if (request.body.github) {
          applicationDetails.github = request.body.github;
        }
        if (request.body.status) {
          applicationDetails.status = request.body.status;
        }
        return await applicationDetails
          .save()
          .then((updatedApplication) => {
            return response.json(updatedApplication);
          })
          .catch((error) => {
            return response.json(error);
          });
      } else {
        return response.json("Job not found");
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

const deleteApplicationPermenently = async (request, response) => {
  return await ApplicationModel.findByIdAndDelete(request.params.applicationId)
    .then(async (application) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        await user.applicationList.splice(
          user.applicationList.findIndex(
            (a) => a._id.toString() === application._id.toString()
          ),
          1
        );

        return await user
          .save()
          .then(async () => {
            const job = await JobModel.findById(application.jobId);
            if (job) {
              await job.applications.splice(
                job.applications.findIndex(
                  (a) => a._id.toString() === application._id.toString()
                ),
                1
              );

              return await job
                .save()
                .then(() => {
                  return response.json(application);
                })
                .catch((error) => {
                  return response.json(error);
                });
            }
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
  insertApplication,
  getAllApplications,
  getApplicationById,
  getApplicationByUserId,
  updateApplication,
  deleteApplicationPermenently,
};
