const UserModel = require('../models/User.model');
const ApplicationModel = require('../models/Applications.model');

const insertApplication = async (userId, data) => {
	return await ApplicationModel.create(data)
		.then(async (createdApplication) => {
			const user = await UserModel.findById(userId);
			if (user) {
				user.applicationList.unshift(createdApplication);
				return user
					.save()
					.then(() => {
						return createdApplication;
					})
					.catch((error) => {
						return error;
					});
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const getAllApplications = async () => {
	return await ApplicationModel.find()
		.then((applications) => {
			return applications;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const getApplicationById = async (applicationId) => {
	return await ApplicationModel.findById(applicationId)
		.then((application) => {
			return application;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const updateApplication = async (applicationId, updateData) => {
	return await ApplicationModel.findById(applicationId)
		.then(async (applicationDetails) => {
			if (applicationDetails) {
				if (applicationDetails.applicantName) {
					applicationDetails.applicantName = updateData.applicantName;
				}
				if (applicationDetails.nic) {
					applicationDetails.nic = updateData.nic;
				}
				if (applicationDetails.contactNumber) {
					applicationDetails.contactNumber = updateData.contactNumber;
				}
				if (applicationDetails.university) {
					applicationDetails.university = updateData.university;
				}
				if (applicationDetails.skills) {
					applicationDetails.skills = updateData.skills;
				}
				if (applicationDetails.languages) {
					applicationDetails.languages = updateData.languages;
				}
				if (applicationDetails.linkedIn) {
					applicationDetails.linkedIn = updateData.linkedIn;
				}
				if (applicationDetails.github) {
					applicationDetails.github = updateData.github;
				}
				if (applicationDetails.status) {
					applicationDetails.status = updateData.status;
				}
				return await applicationDetails.save();
			} else {
				throw new Error("Job not found");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const deleteApplicationPermenently = async (userId,applicationId) => {
	return await ApplicationModel.findByIdAndDelete(applicationId)
		.then(async (application) => {
			const user = await UserModel.findById(userId);
			if (user) {
				await user.applicationList.splice(
					user.applicationList.findIndex((a) => a._id.toString() === application._id.toString()),
					1
				);

				return await user
					.save()
					.then(() => {
						return application;
					})
					.catch((error) => {
						return error;
					});
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

module.exports = {
	insertApplication,
	getAllApplications,
	getApplicationById,
	updateApplication,
	deleteApplicationPermenently,
  };