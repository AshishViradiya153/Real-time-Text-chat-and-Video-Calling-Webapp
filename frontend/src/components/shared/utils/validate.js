export const validateLoginForm = (mail, password) => {
  const isMailValid = validMail(mail);
  const isPasswordValid = ValidatePassword(password);
  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = (username, mail, password) => {
  const isMailValid = validMail(mail);
  const isPasswordValid = ValidatePassword(password);
  const isUsernameValid = ValidateUsername(username);
  return isMailValid && isPasswordValid && isUsernameValid;
};

export const validMail = (mail) => {
  const emailpatten =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;

  return emailpatten.test(mail);
};

export const ValidatePassword = (password) => {
  return password.length > 5 && password.length < 13;
};

export const ValidateUsername = (password) => {
  return password.length > 2 && password.length < 13;
};
