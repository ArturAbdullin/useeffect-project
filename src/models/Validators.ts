export function isEmailValid(email: string): boolean {
  const emailRegExp = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  // const emailRegExp = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "g");
  return emailRegExp.test(email);
}

export function isPasswordValid(password: string): boolean {
  if (password.length > 6) return true;
  else return false;
}