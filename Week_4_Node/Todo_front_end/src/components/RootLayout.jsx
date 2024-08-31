import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <ul className="flex gap-7 bg-slate-800 px-4 text-white ">
        <NavLink to={"/"}>Todos</NavLink>
        <NavLink to={"/todo/create"}>Create todo</NavLink>
      </ul>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
};

export default RootLayout;
