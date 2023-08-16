import React from 'react';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';


let exampledata = {
  id : 'f47ac10b-58cc-4372-a567-0e02b2c3d479' ,
  ticker: 'AAPL',
  name : 'Apple Inc',
  purchasedate : '',
  boughtfor: '127.87',     
  ammountbought : '20',
  total : '1500',
}



function getPurchases() {
  return JSON.parse(localStorage.getItem('purchases')) || [];
}




const StockCards = ({data}) => {
    return (        
<div class="p-4 border-2 hover:bg-green-100 transition duration-300 border-green-100 rounded-lg shadow-md">
    <h1 class="text-xl font-semibold mb-2">Purchase ID: {data.id}</h1>
    <h2 class="text-lg text-gray-700 mb-1">{data.ticker}</h2>
    <h3 class="text-md text-gray-500 mb-3">{data.name}</h3>
    <h3 class="text-md text-gray-500 mb-3">{data.purchasedate}</h3>
    <div class="flex items-center space-x-4 mt-3 gap-4 h-32 justify-center">
    <div className='text-center'>
      <p class="mb-2 text-xl font-medium text-gray-600 dark:text-gray-400">
        Purchase Price
      </p>
      <p class="text-l font-bold text-gray-700 dark:text-gray-200">
        ${data.boughtfor}
      </p>
    </div>
    <div className='text-center'> 
      <p class="mb-2 text-xl font-medium text-gray-600 dark:text-gray-400">
        Amount
      </p>
      <p class="text-l font-bold text-gray-700 dark:text-gray-200">
        {data.ammountbought}
      </p>
    </div>
    <div className='text-center'>
      <p class="mb-2 text-xl font-medium text-gray-600 dark:text-gray-400">
        Total Spent
      </p>
      <p class="text-l font-bold text-gray-700 dark:text-gray-200">
        ${data.total}
      </p>
    </div>
  </div>
</div>
    )
}

function Portfolio(){
  const purchases = JSON.parse(localStorage.getItem('purchases')) || [];

    return (
<div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl flex flex-col justify-between'>
<div className="grid grid-cols-3 gap-10 px-9 pt-10">
{purchases.map((purchase) => (
        <StockCards key={purchase.id} data={purchase} />
      ))}
</div>


<div class="flex justify-center mb-10">
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
      <div className="p-3 rounded-full  dark:text-orange-100 bg-green-100 dark:bg-orange-500 mr-4">

      </div>
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        PORTFOLIO
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">

      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
      <div className="p-3 rounded-full  dark:text-orange-100 bg-green-100 dark:bg-orange-500 mr-4">


      </div>
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        PORTFOLIO CHANGE
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        holder
      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
      <div className="p-3 rounded-full  dark:text-orange-100 bg-green-100 dark:bg-orange-500 mr-4">

      </div>
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        CHANGE PERCENTAGE
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        holder
      </p>
    </div>
    </div>
  </div>
</div>

</div>
    );
  };

  export default Portfolio