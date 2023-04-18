const stytch = require("stytch");
const stytchClient = () => {
  const client = new stytch.Client({
    project_id: process.env.PROJECT_ID,
    secret: process.env.PROJECT_SECRET,
    env: stytch.envs.test,
  });

  return client;
};

module.exports = stytchClient;
