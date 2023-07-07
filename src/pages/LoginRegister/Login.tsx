import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLoginMutation } from "../../app/services/api";
import { useUserStore } from "../../app/store";
import type { Inputs } from "./Register";
import type { ServerError } from "./Register";
import styles from './LoginRegister.module.css';
import Loader from "../../components/Loader/Loader";
import { toast } from 'react-hot-toast'
import type { Toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const schema = yup.object({
  username: yup.string().min(2).max(20).required(),
  password: yup.string().min(2).max(20).required(),
}).required();

function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const registerUser = useUserStore((state: any) => state.registerUser);

  const [updatePost, { isLoading }] = useLoginMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await updatePost(data).unwrap();
      // register user
      registerUser(response);
    } catch (serverErrors: any) {
      if (serverErrors.status === 500) {
        toast((t: Toast) => (
          <div className={styles.toaster}>
            <span>😵{' '}😵{' '}😵</span>
            <br />
            Sunucu hatası daha sonra tekrar deneyiniz!!
            <br />
            <button className={styles.close} onClick={() => toast.dismiss(t.id)}>Kapat</button>
          </div>
        ))
      }
      else if (serverErrors.status === 400) {
        serverErrors.data.errors.map((err: ServerError) => {
          const { type, message } = err;
          setError(type, {
            type: 'manuel',
            message
          })
        })
      }
      else {
        const { type, message } = serverErrors.data;
        setError(type, {
          type: 'manuel',
          message
        })
      }
    }
  }

  if (isLoading) return <div className={styles.wrapper}><Loader /></div>

  return (
    <div className={styles.wrapper}>
      <h2>Giriş</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Kullanıcı Adı</label>
        <input autoComplete="off" type="text" placeholder="Kullanıcı Adı" {...register("username")} />
        <p style={{ color: 'red', fontSize: '1rem' }}>{errors.username?.message}</p>
        <label htmlFor="">Şifre</label>
        <input type="password" placeholder="Şifre" {...register("password", { required: true })} />
        <p style={{ color: 'red', fontSize: '1rem' }}>{errors.password?.message}</p>
        <button type="submit">Giriş Yap</button>
        <div>Üye Değil Misin? <Link to='register'>Hesap Oluşturun</Link></div>
      </form>
    </div>
  );
}

export default Login