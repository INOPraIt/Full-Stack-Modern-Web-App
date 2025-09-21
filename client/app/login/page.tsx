'use client'

import React from 'react'
import Link from 'next/link';
import style from './style.module.sass';
import { toast } from "react-toastify";
import { useLoginUserMutation, useGetProfileQuery } from '@/store/reducers/User';
import { redirect } from 'next/navigation';

export default () => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');


  const [loginUser, {data, isLoading, error}] = useLoginUserMutation();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!name || !password) {
      toast.warning('Введите имя и пароль')
      return
    }
    try {
      const res = await loginUser({ username: name, password }).unwrap()
      toast.success(res.message ?? 'Вход выполнен')
      // подождать 1–1.5с, если хочешь дать тосту показаться
      setTimeout(() => redirect('/'), 1200)
    } catch (err: any) {
      const msg =
        (err?.data?.message as string) ??
        (err?.status === 401 ? 'Неверное имя или пароль' : 'Ошибка при входе')
      toast.error(msg)
    }
  }

  return (
    <div className={style.containerRegister}>
      <div className={style.form}>
        <span className={style.titleRegister}>
          Авторизация
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
        <button onClick={handleLogin}>
          Вход
        </button>
        <Link href={'/register'}>
          Нет аккаунта?
        </Link>
      </div>
    </div>
  )
}
