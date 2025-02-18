import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;    //req.body mtlb jo ham data bhejenge postman se
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  //email should be unique
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  //agar email exist nahi krta hai toh user ko register krva denge
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

//catchAsyncErrors ek middleware create kiya hai ki jo async, sync errors honge jisko hamne handle na kiya ho toh vo unko khud se hi handle kr lega
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email not found!`, 404)
    );
  }
  const populatedPosts = await Promise.all(
    user.posts.map( async (postId) => {
        const post = await Post.findById(postId);
        if(post.author.equals(user._id)){
            return post;
        }
        return null;
    })
)
user = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    posts: populatedPosts
}
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
  
});
export const getProfile = async (req, res) => {
  try {
      const userId = req.params.id;
      let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
      return res.status(200).json({
          user,
          success: true
      });
  } catch (error) {
      console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
      const userId = req.id;
      const { bio, gender } = req.body;
      const profilePicture = req.file;
      let cloudResponse;

      if (profilePicture) {
          const fileUri = getDataUri(profilePicture);
          cloudResponse = await cloudinary.uploader.upload(fileUri);
      }

      const user = await User.findById(userId).select('-password');
      if (!user) {
          return res.status(404).json({
              message: 'User not found.',
              success: false
          });
      };
      if (bio) user.bio = bio;
      if (gender) user.gender = gender;
      if (profilePicture) user.profilePicture = cloudResponse.secure_url;

      await user.save();

      return res.status(200).json({
          message: 'Profile updated.',
          success: true,
          user
      });

  } catch (error) {
      console.log(error);
  }
};
export const getSuggestedUsers = async (req, res) => {
  try {
      const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
      if (!suggestedUsers) {
          return res.status(400).json({
              message: 'Currently do not have any users',
          })
      };
      return res.status(200).json({
          success: true,
          users: suggestedUsers
      })
  } catch (error) {
      console.log(error);
  }
};
export const followOrUnfollow = async (req, res) => {
  try {
      const followKrneWala = req.id; // patel
      const jiskoFollowKrunga = req.params.id; // shivani
      if (followKrneWala === jiskoFollowKrunga) {
          return res.status(400).json({
              message: 'You cannot follow/unfollow yourself',
              success: false
          });
      }

      const user = await User.findById(followKrneWala);
      const targetUser = await User.findById(jiskoFollowKrunga);

      if (!user || !targetUser) {
          return res.status(400).json({
              message: 'User not found',
              success: false
          });
      }
      // mai check krunga ki follow krna hai ya unfollow
      const isFollowing = user.following.includes(jiskoFollowKrunga);
      if (isFollowing) {
          // unfollow logic ayega
          await Promise.all([
              User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
              User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
          ])
          return res.status(200).json({ message: 'Unfollowed successfully', success: true });
      } else {
          // follow logic ayega
          await Promise.all([
              User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
              User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
          ])
          return res.status(200).json({ message: 'followed successfully', success: true });
      }
  } catch (error) {
      console.log(error);
  }
}

