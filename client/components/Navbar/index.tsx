'useq-client';

import React from 'react';
import './style.scss';
import Link from 'next/link';

export default () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className={'containerNavbar'}>
    <div className={'logo'}>
      <Link href="/">Market</Link>
    </div>

    <div className={'menuToggle'} onClick={() => setMenuOpen(!menuOpen)}>
      ☰
    </div>

    <div className={`${'navLinks'} ${menuOpen ? 'show' : ''}`}>
      <Link href="/">Главная</Link>
      <Link href="/profile">Профиль</Link>
      <Link href="/cart">Корзина</Link>
    </div>

    <div>
      <Link href="/login">
        <button className={'loginButton'}>Войти</button>
      </Link>
    </div>
  </nav>
  )
}
