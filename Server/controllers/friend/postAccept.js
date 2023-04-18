const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const {
  updateFriendsPendingInvitations,
  updateFriendsList,
} = require("../../socketHandler/update/friend");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);
    !invitation && res.status(404).send("Error occured. please try again");
    const { senderId, receiverId } = invitation;
    const senderUser = await User.findById(senderId);
    senderUser["friends"] = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser["friends"] = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    await FriendInvitation.findByIdAndDelete(id);

    let userId = {
      _id: receiverId.toString(),
    };
    updateFriendsList(senderId.toString());
    updateFriendsList(receiverId.toString());
    updateFriendsPendingInvitations(userId);
    return res.status(200).send("Friend successfully added");
  } catch (error) {
    return res.status(500).send("Something wrong, please try again🙂");
  }
};
module.exports = postAccept;
