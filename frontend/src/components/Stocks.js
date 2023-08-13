import React from 'react';
import axios from 'axios'
import { useState,useEffect } from 'react';
import SearchBar from './Searchbar';


let stockimage = <svg xmlns="http://www.w3.org/2000/svg" fill="purple" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>




function UpImage({net,price}) {

  let up =<div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-14  rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>

              <div>{price}</div>
          </div>

  let down = <div class="flex flex-shrink-0 items-center justify-center bg-red-200 h-14  rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>

            <div>{price}</div>
          </div>


        if (net == 1) {
          return up
        }
        return down
}


const TickerSymbol = ({ symbol }) => {
  return (
    <div className="bg-gray-500 text-white px-3 py-1 rounded-md h-full flex items-center justify-center">
      <span className="font-medium align-middle">{symbol}</span>
    </div>
  );
};

const JsonDataComponent = ({ data }) => {
  return (
    <div className="p-6 ">
    <div className="w-9/12 mx-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
      <tr className='shadow transition-shadow hover:shadow-md text-xl'>
        <th className="px-6 py-4 text-left">Ticker</th>
        <th className="px-6 py-4 text-left">Name</th>
        <th className="px-6 py-4 text-left">Current Price</th>
        <th className="px-6 py-4 text-left">Change</th>
        <th className="px-6 py-4 text-left">Percent Change</th>
        <th className="px-6 py-4 text-left"></th>
      </tr>
  </thead>
        <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item) => (
  <tr className='shadow transition-shadow hover:shadow-md'>
  <td className="px-6 py-4 w-1/12 text-left align-middle  items-center">
    <TickerSymbol symbol={item["ticker"]} />
  </td>
  <td className="px-6 py-4 text-left align-middle text-2xl font-bold">
    {item["name"]}
  </td>
  <td className="px-6 py-4 text-left align-middle font-bold text-2xl">
    {item["current_price"]}
  </td>
  <td className="px-6 py-4 text-left align-middle font-bold text-2xl">
    <span className={item['increase'] === '1' ? 'text-green-500' : 'text-red-500'}>
      {item["change"]}
    </span>
  </td>
  <td className="px-6 py-4 text-left align-middle">
    <UpImage />
  </td>
  <td className="px-6 py-4 text-left align-middle font-bold text-2xl"></td>
</tr>
      ))}
      </tbody>
      </table>
      </div>
      </div>
  );
};




function Stocks() {
  const [trending, setTrending] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/trending/');
        const data = await response.json();
        // Handle the data obtained from the API call here
        setTrending(data);
        console.log(data);
        
        // You can use the "data" variable within this scope or call another function to handle the data.
      } catch (error) {
        // Handle error if the API call fails
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
    return (
<>
<SearchBar/>
{trending && <JsonDataComponent data={trending} />}
</>
    )
}

export default Stocks