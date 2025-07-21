// 이메일 유효성 검사
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 비밀번호 유효성 검사 : 영문 + 숫자 + 특수문자 포함 10자 이상
export const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\-:";'<>?,./~`|\\]).{10,}$/;
  return regex.test(password);
};