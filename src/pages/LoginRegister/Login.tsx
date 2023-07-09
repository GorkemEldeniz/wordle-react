import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from "../../app/services/api";
import { useUserStore } from "../../app/store";
import type { Inputs } from "./Register";
import styles from './LoginRegister.module.css';
import Loader from "../../components/Loader/Loader";
import { toast } from 'react-hot-toast'
import type { Toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { schema } from "../../utils";
import type { FetchError } from "../../types";


function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const registerUser = useUserStore((state: any) => state.registerUser);

  const [login, { isLoading }] = useLoginMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      // register user
      registerUser(response);
    } catch (serverErrors: FetchError | any) {
      if (serverErrors.status === 500 || serverErrors.status === 'FETCH_ERROR') {
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
      else if (serverErrors.status === 400 && Array.isArray(serverErrors.data.errors)) {
        serverErrors.data.errors.map((err: any) => {
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