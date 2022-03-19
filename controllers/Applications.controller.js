const UserModel = require('../models/User.model');
const ApplicationModel = require('../models/Applications.model');

const insertApplication = async (request, response) => {
	return await ApplicationModel.create(request.body)
		.then(async (createdApplication) => {
			const user = await UserModel.findById(request.params.userId);
			if (user) {
				user.applicationList.unshift(createdApplication);
				return user
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
};

const getAllApplications = async (request, response) => {
	return await ApplicationModel.find()
		.then((applications) => {
			return response.json(applications);
		})
		.catch((error) => {
			return response.json(error);
		});
};

const getApplicationById = async  (request, response) => {
	return await ApplicationModel.findById(request.params.applicationId)
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
				if (applicationDetails.applicantName) {
					applicationDetails.applicantName = request.body.applicantName;
				}
				if (applicationDetails.nic) {
					applicationDetails.nic = request.body.nic;
				}
				if (applicationDetails.contactNumber) {
					applicationDetails.contactNumber = request.body.contactNumber;
				}
				if (applicationDetails.university) {
					applicationDetails.university = request.body.university;
				}
				if (applicationDetails.skills) {
					applicationDetails.skills = request.body.skills;
				}
				if (applicationDetails.languages) {
					applicationDetails.languages = request.body.languages;
				}
				if (applicationDetails.linkedIn) {
					applicationDetails.linkedIn = request.body.linkedIn;
				}
				if (applicationDetails.github) {
					applicationDetails.github = request.body.github;
				}
				if (applicationDetails.status) {
					applicationDetails.status = request.body.status;
				}
				return await applicationDetails.save().then((updatedApplication)=>{
					return response.json(updatedApplication);
				}).catch((error)=>{
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
					user.applicationList.findIndex((a) => a._id.toString() === application._id.toString()),
					1
				);

				return await user
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
};

module.exports = {
	insertApplication,
	getAllApplications,
	getApplicationById,
	updateApplication,
	deleteApplicationPermenently,
  };