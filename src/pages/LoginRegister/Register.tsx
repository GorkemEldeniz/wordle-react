import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRegisterMutation } from "../../app/services/api";
import { useUserStore } from "../../app/store";

export type Inputs = {
  username: string
  password: string
};

export type ServerError = {
  type: 'username' | 'password'
  message: string
}

const schema = yup.object({
  username: yup.string().min(2).max(20).required(),
  password: yup.string().min(2).max(20).required(),
}).required();

function Register() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const registerUser = useUserStore((state: any) => state.registerUser);

  const [updatePost, { isLoading }] = useRegisterMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await updatePost(data).unwrap();
      // register user to state management
      registerUser(response);
    } catch (serverErrors: any) {
      if (Array.isArray(serverErrors.data.errors)) {
        serverErrors.data.errors.map((err: ServerError) => {
          const { type, message } = err;
          setError(type, {
            type: 'manuel',
            message
          })
        })
      }
    }
  }

  if (isLoading) return <div>Loading..</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Username</label>
      <br />
      <input type="text" placeholder="username" {...register("username")} />
      <br />
      <p style={{ color: 'red', fontSize: '1rem' }}>{errors.username?.message}</p>
      <br />
      <label htmlFor="">Password</label>
      <br />
      <input type="password" placeholder="password" {...register("password", { required: true })} />
      <br />
      <p style={{ color: 'red', fontSize: '1rem' }}>{errors.password?.message}</p>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register