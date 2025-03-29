'use client'

import React, {useEffect, useState} from 'react';
import './style.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { connect } from 'react-redux';
import { RootState } from '@/store/createStore';
import { loginUser } from '@/store/actions/user.actions';

export default connect(
  (state: RootState) => ({
    logined: state.user.logined
  }),
  {
    loginUser,
  }
)(
  ({
    loginUser,
    logined
  }: {
    logined?: string | null;
    loginUser: (data: { username: string; password: string }) => void;
  }) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const loginedUser = () => {
      loginUser({username, password})
    }

    useEffect(() => {
      if (logined !== null) {
        router.push('/')
      }
    }, [logined, router])

  return (
    <div className='containerLogin'>
      <div className='loginWindow'>
        <p className='headerLogin'>Login</p>
        <input 
          className='inputLogin'
          type='email'
          placeholder='Email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          className='inputLogin'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='loginBtn' onClick={loginedUser}>
          Войти
        </button>
        <div className='noAccaunt'>
          <p className='noAccauntText'>
            Нет аккаутна?
          </p>
          <Link 
            href="/register" 
            className='linkNoAccaunt'>
              Регистрация
          </Link>
        </div>
      </div>
    </div>
  )
});
