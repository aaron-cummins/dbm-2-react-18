import React from "react";
import { useStateContext } from "contexts/ContextProvider";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import logo from "assets/img/DBM2.0.png";

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const Menu = (props) => {
  const { currentColor, activeMenu, setActiveMenu, setIsClicked } =
    useStateContext();

  //const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleCloseSideBar = () => {
    //if (activeMenu !== undefined && screenSize <= 960) {
    setActiveMenu(false);
    //}
    setIsClicked(initialState);
  };

  const activeLink =
    "flex items-center gap-3 pl-2 pt-1 pb-1 rounded-lg text-white text-md";
  const normalLink =
    "flex items-center gap-3 pl-2 pt-1 pb-1 rounded-lg text-md text-white hover:text-gray-100 hover:bg-light-gray";

  /*const openSubMenu = (e, controll) => {
    let icon = document.querySelector(`#icon-${controll}`);

    if (e.currentTarget.getAttribute("aria-expanded") === "true") {
      e.currentTarget.classList.add("bg-gray-cummins");
      icon.classList.add("rotate-180");
    } else {
      e.currentTarget.classList.remove("bg-gray-cummins");
      icon.classList.remove("rotate-180");
    }
  };*/
  return (
    <div
      id={`control-${props.controller}`}
      name="submenu"
      className="flex-none bg-gray-cummins p-1 flex-col overflow-auto hidden">
      {/* LOGO */}
      <div className="flex justify-between items-center">
        <Link
          to="/"
          onClick={handleCloseSideBar}
          className="items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tightdark:text-white text-white">
          {/*<img src='img/logo/logo_blanco-icono.png' width='40px' alt='cummins' /> */}
          <span>
            <img src={logo} width="100%" alt="cummins" />
          </span>
        </Link>
        <TooltipComponent content="Menu" position="BottomCenter">
          <button
            type="button"
            onClick={() => setActiveMenu(!activeMenu)}
            style={{ color: currentColor }}
            className="text-xl rounded-full p-3 hover:bg-light-gray-2 mt-4 block md:hidden">
            <MdOutlineCancel />
          </button>
        </TooltipComponent>
      </div>

      <div className="flex-grow border-t border-gray-400 mt-2 mb-3"></div>

      {/* NOMBRE MODULO */}
      <div className="justify-between items-center mb-1 text-gray-100 text-center">
        <p className="uppercase text-lg">{props.nombremodulo}</p>
      </div>

      {/* MENUSES */}
      <div className="mt-1 ">
        <ul className="relative" key={`links-${props.controller}`}>
          {props.grupo.map((item) => (
            <li className="relative pb-1" key={item.id}>
              <div className="justify-between mb-1 text-gray-400">
                <p className="uppercase text-sm flex">{item.nombre}</p>
              </div>
              <div className="border-l border-gray-500 mt-1 mb-1">
                {item.vistas.map((menu) => (
                  <NavLink
                    to={`/${menu.accion}`}
                    key={menu.accion}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }>
                    <span className="capitalize text-sm">{menu.nombre}</span>
                  </NavLink>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
