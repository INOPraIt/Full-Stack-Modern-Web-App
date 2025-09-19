'use client'

import React from 'react'
import Link from 'next/link';
import style from './style.module.sass';
import { useRegisterUserMutation } from '@/store/reducers/User';

export default () => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  
  const [registerUser, {data, isLoading, error}] = useRegisterUserMutation();

  const handleRegisterUser = () => {
    registerUser({
      username: name,
      password: password
    })
  } 

  console.log(data);
  

  return (
    <div className={style.containerRegister}>
      <div className={style.form}>
        <span className={style.titleRegister}>
          Регистрация
        </span>
        <input 
          className={style.input}
          placeholder='Имя'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          className={style.input}
          placeholder='Пароль'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          className={style.input}
          placeholder='Повторите пароль'
          type='password'
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <button onClick={handleRegisterUser}>
          Регистрация
        </button>
        <Link href={'/login'}>
          Есть аккаунт?
        </Link>
      </div>
    </div>
  )
}
