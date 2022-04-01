const OpenToWork = require('../models/OpenToWorks.model');
const UserModel = require('../models/User.model');

const insertOpenToWork = async (request, response) => {
	return await OpenToWork.create(request.body)
		.then(async (createdOpenToWork) => {
			const user = await UserModel.findById(request.params.userId);
			if (user) {
				user.openToWorkList.unshift(createdOpenToWork);
				return user
					.save()
					.then(() => {
						return response.json(createdOpenToWork);
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

const getAllOpenToWorks = async (request, response) => {
	return await OpenToWork.find()
		.then((openToWorks) => {
			return response.json(openToWorks);
		})
		.catch((error) => {
			return response.json(error);
		});
};

const getOpenToWorkById = async (request, response) => {
	return await OpenToWork.findById(request.params.openToWorkId)
		.then((openToWork) => {
			return response.json(openToWork);
		})
		.catch((error) => {
			return response.json(error);
		});
};

const updateOpenToWork = async (request, response) => {
	return await OpenToWork.findById(request.params.openToWorkId)
		.then(async (openToWorkDetails) => {
			if (openToWorkDetails) {
				if (request.body.applicantName) {
					openToWorkDetails.applicantName = request.body.applicantName;
				}
				if (request.body.applyingPosition) {
					openToWorkDetails.applyingPosition = request.body.applyingPosition;
				}
				if (request.body.description) {
					openToWorkDetails.description = request.body.description;
				}
				return await openToWorkDetails.save().then((updatedOpenToWork)=>{
					return response.json(updatedOpenToWork);
				}).catch((error)=>{
					return response.json(error);
				});
			} else {
				return response.json("OpenToWork not found");
			}
		})
		.catch((error) => {
			return response.json(error);
		});
};

const deleteOpenToWorkPermenently = async (request, response)  => {
	return await OpenToWork.findByIdAndDelete(request.params.openToWorkId)
		.then(async (openToWork) => {
			const user = await UserModel.findById(request.params.userId);
			if (user) {
				await user.openToWorkList.splice(
					user.openToWorkList.findIndex((a) => a._id.toString() === openToWork._id.toString()),
					1
				);

				return await user
					.save()
					.then(() => {
						return response.json(openToWork);
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
	insertOpenToWork,
	getAllOpenToWorks,
	getOpenToWorkById,
	updateOpenToWork,
	deleteOpenToWorkPermenently,
  };