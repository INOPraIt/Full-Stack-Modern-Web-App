"use client";

import React from "react";
import Link from "next/link";
import style from "./style.module.sass";
import { useRegisterUserMutation } from "@/store/reducers/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");

  const [registerUser, { data, isLoading, error }] = useRegisterUserMutation();

  const handleRegisterUser = () => {
    if (password !== rePassword) {
      toast.error("Пароли не совпадают", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    registerUser({
      username: name,
      password: password,
    });
  };

  console.log(data);

  React.useEffect(() => {
    if (data?.success) {
      toast.success("Успешная регистрация");
    } else if (data && !data.success) {
      toast.error(data.message || "Ошибка при регистрации");
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      toast.error("Что-то пошло не так");
    }
  }, [error]);

  return (
    <div className={style.containerRegister}>
      <div className={style.form}>
        <span className={style.titleRegister}>Регистрация</span>
        <input
          className={style.input}
          placeholder="Имя"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={style.input}
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={style.input}
          placeholder="Повторите пароль"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <button onClick={handleRegisterUser}>Регистрация</button>
        <Link href={"/login"}>Есть аккаунт?</Link>
      </div>
    </div>
  );
};
