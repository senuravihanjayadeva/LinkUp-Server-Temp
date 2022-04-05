const JobModel = require("../models/Jobs.model");
const UserModel = require("../models/User.model");

const insertJob = async (request, response) => {
  return await JobModel.create(request.body)
    .then(async (createdJob) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        user.jobList.unshift(createdJob);
        return user
          .save()
          .then(() => {
            return response.json(createdJob);
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

const getAllJobs = async (request, response) => {
  return await JobModel.find()
    .then((jobs) => {
      return response.json(jobs);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getJobById = async (request, response) => {
  return await JobModel.findById(request.params.jobId)
    .then((job) => {
      return response.json(job);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const updateJob = async (request, response) => {
  return await JobModel.findById(request.params.jobId)
    .then(async (jobDetails) => {
      if (jobDetails) {
        if (request.body.companyLogo) {
          jobDetails.companyLogo = request.body.companyLogo;
        }
        if (request.body.companyName) {
          jobDetails.companyName = request.body.companyName;
        }
        if (request.body.jobImage) {
          jobDetails.jobImage = request.body.jobImage;
        }
        if (request.body.position) {
          jobDetails.position = request.body.position;
        }
        if (request.body.salary) {
          jobDetails.salary = request.body.salary;
        }
        if (request.body.description) {
          jobDetails.description = request.body.description;
        }
        jobDetails
          .save()
          .then((updatedJob) => {
            return response.json(updatedJob);
          })
          .catch((error) => {
            return response.json(error);
          });
      } else {
        return response.json("Job Not Found");
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

const deleteJobPermenently = async (request, response) => {
  return await JobModel.findByIdAndDelete(request.params.jobId)
    .then(async (job) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        await user.jobList.splice(
          user.jobList.findIndex(
            (a) => a._id.toString() === job._id.toString()
          ),
          1
        );

        return await user
          .save()
          .then(() => {
            return response.json(job);
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
  insertJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJobPermenently,
};
