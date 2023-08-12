import React from 'react';
import { useState,useEffect } from 'react';



let exampledata = {
  id : 'f47ac10b-58cc-4372-a567-0e02b2c3d479' ,
  ticker: 'AAPL',
  name : 'Apple Inc',
  boughtfor: '127.87',     
  ammountbought : '20',
  total : '',
}




const StockCards = ({data}) => {
    return (        
<div class="p-4 border-2 hover:bg-green-100 transition duration-300 border-green-100 rounded-lg shadow-md">
    <h1 class="text-xl font-semibold mb-2">Purchase ID: {data.id}</h1>
    <h2 class="text-lg text-gray-700 mb-1">{data.ticker}</h2>
    <h3 class="text-md text-gray-500 mb-3">{data.name}</h3>
    <div class="flex items-center space-x-4 mt-3 border h-20">
    <div class="text-lg font-medium text-blue-700">${data.boughtfor}</div>
    <div class="text-md text-gray-600">Quantity: <span class="text-gray-800">{data.ammountbought}</span></div>
    <div class="text-lg font-medium text-green-700">${data.total}</div>
</div>

</div>
    )
}

function Portfolio(){
    localStorage.setItem('test','test')
    return (
<div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl flex flex-col justify-between'>
<div className="grid grid-cols-3 gap-10 px-9 pt-10">
  <StockCards data={exampledata}/>
</div>


<div className=" text-white p-4 mx-10 gap-4 justify-center h-40 mb-8 flex">
      <div className='bg-green-50 w-80'>test</div>
      <div className='bg-green-50 w-80'></div>
      <div className='bg-green-50 w-80'></div>

</div>

</div>
    );
  };

  export default Portfolio