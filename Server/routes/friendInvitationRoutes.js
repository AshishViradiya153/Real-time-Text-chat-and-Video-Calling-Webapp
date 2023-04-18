const friendInvitationControllers = require("../controllers/friend/friendInvitationControllers");
const auth = require("../middleware/auth");
const router = require("express").Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const postFriendInvitationSchema = Joi.object({
  requestMail: Joi.string().email().required().trim().lowercase(),
});
const postFriendAcceptRejectSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  validator.body(postFriendInvitationSchema),
  auth,
  friendInvitationControllers.controller.postInvite
);

router.post(
  "/accept",
  validator.body(postFriendAcceptRejectSchema),
  auth,
  friendInvitationControllers.controller.postAccept
);

router.post(
  "/reject",
  validator.body(postFriendAcceptRejectSchema),
  auth,
  friendInvitationControllers.controller.postReject
);
module.exports = router;
