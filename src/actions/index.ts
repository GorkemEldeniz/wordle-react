import type { ActionFunctionArgs } from "react-router-dom"

const register = async ({request}:ActionFunctionArgs) => {
  const data = await request.formData();
  console.log(data.get('username'));
  return '';
}


export {
  register
}