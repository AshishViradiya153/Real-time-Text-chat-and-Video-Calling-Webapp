const addUserToLocalStorage = async (user) => {
  await localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const getUserToLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

module.exports = {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserToLocalStorage,
};
