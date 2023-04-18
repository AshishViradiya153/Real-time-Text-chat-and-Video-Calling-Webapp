const FriendInvitation = require("../../models/friendInvitation");
const {
  updateFriendsPendingInvitations,
} = require("../../socketHandler/update/friend");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const userDetails = req.user;
    const invitationExists = await FriendInvitation.exists({
      _id: id,
    });
    console.log("=======>>>>>>>>invitationExists", invitationExists);
    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    let userId = {
      _id: userDetails?.userId,
    };
    updateFriendsPendingInvitations(userId);
    res.status(200).send("Invitation successfully rejected");
  } catch (error) {
    console.log("🚀 ~ file: postReject.js:6 ~ postReject ~ error", error);
    return res.status(500).send("Something wrong, please try again🙂");
  }
};

module.exports = postReject;
