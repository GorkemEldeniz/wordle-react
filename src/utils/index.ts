// yapılacak...
import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().min(2, 'Kullanıcı Adı minumum 2 karakterden oluşmalı').max(20, 'Kullanıcı Adı maksimum 20 karakterden oluşmalı').required(),
  password: yup.string().min(2, 'Şifre Adı minumum 2 karakterden oluşmalı').max(20, 'Şifre Adı maksimum 20 karakterden oluşmalı').required(),
}).required();

export const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}