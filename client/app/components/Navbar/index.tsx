"use client";

import style from "./style.module.sass";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useGetProfileQuery } from "@/store/reducers/User";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default () => {
  const [open, setOpen] = React.useState(false);

  const { data, isSuccess } = useGetProfileQuery();
  const user = isSuccess ? data.user : undefined;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = React.useState(searchParams.get("q") ?? "");

  React.useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [q, pathname, router, searchParams]);

  return (
    <div className={style.navbarContainer}>
      <div className={style.navbarLinks}>
        <Image
          width={50}
          height={50}
          alt="logo"
          src={logo}
          className={style.logo}
        />
        <div className={style.links}>
          <Link className={style.link} href="/market">
            Магазин
          </Link>
          <Link className={style.link} href="/profile">
            Профиль
          </Link>
          <Link className={style.link} href="/trade">
            Обмены
          </Link>
          <button onClick={() => setOpen((v) => !v)} className={style.search}>
            <span className={style.link}>Поиск</span>
          </button>
        </div>
        <div className={style.buttons}>
          <button className={style.buttonLogin}>
            <Link className={style.linkLogin} href="/register">
              {user ? "Выход" : "Авторизация"}
            </Link>
          </button>
        </div>
      </div>

      {open && (
        <div className={style.searchInput}>
          <input
            placeholder="Поиск"
            className={style.inpSearch}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
