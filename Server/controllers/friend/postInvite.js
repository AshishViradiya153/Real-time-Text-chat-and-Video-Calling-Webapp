const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const {
  updateFriendsPendingInvitations,
} = require("../../socketHandler/update/friend");
const postInvite = async (req, res) => {
  console.log("======>>>>>req inside postinvite", req.user);
  console.log("======>>>>>req inside postinvite", req.body);
  const { requestMail } = req.body;

  const { userId, mail } = req?.user;
  if (requestMail.toLowerCase() === mail.toLowerCase()) {
    return res.status(409).send("You can't become a friend with your self.");
  }
  const targetUser = await User.findOne({
    mail: requestMail.toLowerCase(),
  });
  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${requestMail} has been not found. Plaese check requested mail address.`
      );
  }

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived) {
    return res
      .status(409)
      .send(`Invitation has been already sent on ${requestMail} `);
  }
  console.log("userId", userId);
  console.log("targetUser", targetUser["friends"]);
  const userAlreadyFriend = targetUser.friends.find((friendId) => {
    return friendId.toString() === userId.toString();
  });
  if (userAlreadyFriend) {
    return res
      .status(409)
      .send(
        `You are already friend with ${targetUser?.username}, check your friends list.`
      );
  }
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  updateFriendsPendingInvitations(targetUser);

  return res.status(201).send("Invitation has been sent");
};

module.exports = postInvite;
