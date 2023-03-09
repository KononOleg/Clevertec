export const regex = {
  password: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
  username: /^[a-zA-Z\d]/,
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
  onlyLetter: /^[a-zA-Z\d]/,
  phone:
    /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
  onlyNumber: /[0-9]/,
  onlyCyrillic: /[А-Яа-я]/,
  firstUpper: /[A-Z]/,
};
