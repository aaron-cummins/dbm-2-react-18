import React from 'react';

const Header = (props) => (
  <div className=" mb-5">
    <p className="text-lg text-gray-400">{props.category}</p>

    <div className="flex justify-between items-center gap-2 mb-3">
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {props.title}
      </p>
      <p>
        { props.children }
      </p>  
    </div>
  </div>
);

export default Header;
