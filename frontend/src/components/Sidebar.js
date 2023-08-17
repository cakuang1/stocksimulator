
import React from 'react';
import { NavLink,useLocation} from 'react-router-dom';
import { useState } from 'react';




function SidebarButton({ to, icon, text ,active}) {

  return (
<NavLink
  to={to}
  className={`relative flex flex-row items-center h-11 focus:outline-none text-gray-600  border-l-4 border-transparent hover:border-green-200 pr-6 ${
    active  ? 'bg-green-100' : ''
  }`}>
  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg">
    {icon}
    <span className="mx-2 text-xl font-medium">{text}</span>
  </a>
</NavLink>


  );
};


let portfolio = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>


let stockimage = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>

let abuoutimage = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>

function Sidebar(){
  const location = useLocation();
  const isPortfolioActive = location.pathname === '/';
  const isStocksActive = location.pathname === '/stocks';
  const isAboutActive = location.pathname === '/about';
  
  return (

<div class="w-80 h-screen bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 sticky top-0">
  <div class="p-4">
    <label class="text-lg text-gray-600 dark:text-gray-400">Main</label>
    <nav class="mt-3 space-y-2">
      <SidebarButton to="/" icon={portfolio} text="Portfolio" active={isPortfolioActive} />
      <SidebarButton to="/stocks" icon={stockimage} text="Stocks" active={isStocksActive} />
    </nav>
  </div>
  <div class="border-t border-gray-300 dark:border-gray-700 p-4 mt-auto">
    <label class="text-sm text-gray-600 uppercase dark:text-gray-400">Misc</label>
    <nav class="mt-3 space-y-2">
      <SidebarButton to="/about" icon={abuoutimage} text="About" active={isAboutActive} />
    </nav>
  </div>
</div>

  )
}

export default Sidebar




  