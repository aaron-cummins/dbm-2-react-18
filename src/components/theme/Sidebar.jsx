import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineChevronRight } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, setIsClicked } = useStateContext();

  const handleCloseSideBar = () => {
    //if (activeMenu !== undefined && screenSize <= 960) {
    setActiveMenu(false);
    //}
    setIsClicked(initialState);
  };

  //const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-200 text-md m-2';
  //const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray hover:text-black m-2';

  const activeLink = "flex items-center gap-5 pl-4 pt-2 pb-2 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-2 pb-2 rounded-lg text-md m-2 text-white hover:text-gray-100 hover:bg-light-gray";

  const openSubMenu = (e, controll) => {
    let icon = document.querySelector(`#icon-${controll}`);

    if (e.currentTarget.getAttribute("aria-expanded") === "true") {
      e.currentTarget.classList.add("bg-gray-cummins");
      icon.classList.add("rotate-180");
    } else {
      e.currentTarget.classList.remove("bg-gray-cummins");
      icon.classList.remove("rotate-180");
    }
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tightdark:text-white text-white">
              <img src="img/logo/logo_blanco-icono.png" width="40px" alt="cummins" />
              <span>
                <img src="img/logo/logo_blanco-texto.png" width="70%" alt="cummins" />{" "}
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
          <div className="mt-10 ">
            {links.map((item) => (
              <ul className="relative" key={`links${item.controller}`}>
                <li className="relative" key={item.controller}>
                  {
                    /* Si tiene submenu ejecuta este codigo */
                    item.links ? (
                      <a
                        href="#!"
                        onClick={(e) => {
                          openSubMenu(e, item.controller);
                        }}
                        className={`mt-4 capitalize flex items-center gap-5 pl-4 pt-2 pb-2 rounded-lg text-white text-md m-2 hover:bg-light-gray`}
                        data-mdb-ripple="true"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${item.controller}`}
                        aria-expanded="true"
                        aria-controls="collapseSidenavEx1">
                        {item.title}
                        <BsChevronDown
                          id={`icon-${item.controller}`}
                          className="duration-200 ml-auto mr-2"
                        />
                      </a>
                    ) : (
                      /* Si NO tiene submenu ejecuta este codigo */
                      <NavLink
                        to={`/${item.action}`}
                        key={item.action}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        <span className="capitalize">{item.title}</span>
                      </NavLink>
                    )
                  }

                  {
                    /* Si tiene submenu ejecuta este codigo */
                    item.links && (
                      <ul
                        className="relative accordion-collapse collapse"
                        id={item.controller}
                        aria-labelledby="sidenavEx1"
                        data-bs-parent="#sidenavExample">
                        {item.links.map((link) => (
                          <li key={link.action}>
                            <NavLink
                              to={`/${link.action}`}
                              key={link.action}
                              onClick={handleCloseSideBar}
                              style={({ isActive }) => ({
                                backgroundColor: isActive ? currentColor : "",
                              })}
                              className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                              <MdOutlineChevronRight />
                              <span className="capitalize">{link.title}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                </li>
              </ul>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
