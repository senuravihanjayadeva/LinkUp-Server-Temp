const PostModel = require("../models/Posts.model");
const UserModel = require("../models/User.model");

const insertPost = async (request, response) => {
  return await PostModel.create(request.body)
    .then(async (createdPost) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        user.posts.unshift(createdPost);
        return user
          .save()
          .then(() => {
            return response.json(createdPost);
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

const getAllPosts = async (request, response) => {
  return await PostModel.find()
    .then((posts) => {
      return response.json(posts);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const getPostById = async (request, response) => {
  return await PostModel.findById(request.params.postId)
    .then((post) => {
      return response.json(post);
    })
    .catch((error) => {
      return response.json(error);
    });
};

const updatePost = async (request, response) => {
  return await PostModel.findById(request.params.postId)
    .then(async (postDetails) => {
      if (postDetails) {
        if (request.body.fullName) {
          postDetails.fullName = request.body.fullName;
        }
        if (request.body.position) {
          postDetails.position = request.body.position;
        }
        if (request.body.profileImageURL) {
          postDetails.profileImageURL = request.body.profileImageURL;
        }
        if (request.body.postImage) {
          postDetails.postImage = request.body.postImage;
        }
        if (request.body.description) {
          postDetails.description = request.body.description;
        }
        postDetails
          .save()
          .then((updatedPost) => {
            return response.json(updatedPost);
          })
          .catch((error) => {
            return response.json(error);
          });
      } else {
        return response.json("Post Not Found");
      }
    })
    .catch((error) => {
      return response.json(error);
    });
};

const deletePostPermenently = async (request, response) => {
  return await PostModel.findByIdAndDelete(request.params.postId)
    .then(async (post) => {
      const user = await UserModel.findById(request.params.userId);
      if (user) {
        await user.posts.splice(
          user.posts.findIndex((a) => a._id.toString() === post._id.toString()),
          1
        );

        return await user
          .save()
          .then(() => {
            return response.json(post);
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
  insertPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePostPermenently,
};
