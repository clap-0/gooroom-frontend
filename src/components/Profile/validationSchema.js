import * as yup from 'yup';
import {
  REGEXP_NAME,
  nameMax,
  nameMin,
  pwdMax,
  pwdMin,
} from 'constants/memberConstants';

// 프로필 수정 폼의 유효성 검증을 위한 yup 객체
export const profileSchema = yup.object().shape({
  nickname: yup // 닉네임 글자 수 확인
    .string()
    .required()
    .matches(REGEXP_NAME)
    .min(nameMin)
    .max(nameMax),
});

// 계정 삭제 폼의 유효성 검증을 위한 yup 객체
export const withdrawalSchema = yup.object().shape({
  checkPassword: yup.string().required().min(pwdMin).max(pwdMax),
});
