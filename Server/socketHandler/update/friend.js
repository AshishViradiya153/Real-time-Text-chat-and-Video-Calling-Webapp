const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");
const updateFriendsPendingInvitations = async ({ _id }) => {
  console.log(
    "🚀 ~ file: friend.js:5 ~ updateFriendsPendingInvitations ~ _id",
    _id
  );
  try {
    const pendingInvitation = await FriendInvitation.find({
      receiverId: _id,
    }).populate("senderId", "_id username mail");

    const receiverList = serverStore.getActiveConnections(_id);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId.toString()).emit("friend-invitations", {
        pendingInvitation: pendingInvitation ? pendingInvitation : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFriendsList = async (userId) => {
  try {
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      "friends",
      "_id mail username"
    );
    let friendsList = [];
    if (user) {
      friendsList = user.friends.map((friend) => {
        return {
          id: friend._id,
          username: friend.username,
          mail: friend.mail,
        };
      });
      console.log("=???????", friendsList);
    }
    const io = serverStore.getSocketServerInstance();

    const receiverList = serverStore.getActiveConnections(userId);

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId.toString()).emit("user-friends-list", {
        friends: friendsList ? friendsList : [],
      });
    });
  } catch (error) {
    console.log("==========>>>>>", error);
  }
};

module.exports = { updateFriendsPendingInvitations, updateFriendsList };
