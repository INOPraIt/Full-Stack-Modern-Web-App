'use client'

import Link from 'next/link'
import React, {useState, useEffect} from 'react';
import './style.scss';
import { toast } from 'react-toastify';

import { registerUser, changeUserFieldAction } from '@/store/actions/user.actions';
import { connect } from 'react-redux';
import { RootState } from '@/store/createStore';


export default connect(
  (state: RootState) => ({
    registred: state.user.registred
  }),
  {
    registerUser,
    changeUserFieldAction
  }
)(
  ({
    registerUser,
    changeUserFieldAction,
    registred,
  }: {
    registerUser: (data: { username: string; password: string }) => void;
    registred?: string | null;
    changeUserFieldAction: (data: {name: string; value: null}) => void;
  }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleRegister = () => {
      if (password !== rePassword) {
        alert('Пароли не совпадают');
        return;
      }
      registerUser({ username, password });
    };

    useEffect(() => {
      if (registred) {
        toast('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (registred !== null)changeUserFieldAction({name: 'registred', value: null});
    })

    return (
      <div className='containerLogin'>
        <div className='loginWindow'>
          <p className='headerLogin'>Register</p>
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
          <input 
            className='inputLogin'
            type='password'
            placeholder='RePassword'
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <button className='loginBtn' onClick={handleRegister}>
            Регистрация
          </button>
          <div className='noAccaunt'>
            <p className='noAccauntText'>Есть аккаунт?</p>
            <Link href="/login" className='linkNoAccaunt'>
              Войти
            </Link>
          </div>
        </div>
      </div>
    );
  }
);