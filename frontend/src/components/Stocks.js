import React from 'react';

import { useState,useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import SearchBar from './Searchbar';



function UpImage({net,price}) {
  let up =<div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-14  rounded text-green-500 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
              <div className='text-2xl '>{price}</div>
          </div>

  let down = <div class="flex flex-shrink-0 items-center justify-center bg-red-200 h-14  rounded text-red-500 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>

            <div className='text-2xl '>{price}</div>
          </div>

        if (net == "1") {
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
  const navigate = useNavigate();
  const goRouteId = (id) => {
   navigate(`${id}`);
  }  
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
  <tr key={item.ticker} className='shadow transition-shadow hover:shadow-md cursor-default' onClick={() => goRouteId(item.ticker.toLowerCase())}> 
  <td className="px-6 py-4 w-1/12 text-left align-middle  items-center">
    <TickerSymbol symbol={item["ticker"]} />
  </td>
  <td className="px-6 py-4 text-left align-middle text-2xl font-bold">
    {item["name"]}
  </td>
  <td className="px-6 py-4 text-left align-middle font-bold text-2xl">
    ${item["current_price"]}
  </td>
  <td className="px-6 py-4 text-left align-middle font-bold text-2xl">
    <span className={item['increase'] === '1' ? 'text-green-500' : 'text-red-500'}>
      ${item["change"]}
    </span>
  </td>
  <td className="px-6 py-4 text-left align-middle">
    <UpImage net  = {item.increase} price={item.percent_change}/>
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
    <div className='w-11/12 '>
    <SearchBar/>
    


<div className='innerlayer bg-white min-h-screen  m-auto border rounded-2xl flex flex-col justify-between h-auto mt-4'>
{trending ? (
  <div>
<div class="flex items-center justify-center mt-10">
  <h1 class="py-2 px-4 bg-green-200 text-white rounded-md text-2xl font-semibold shadow-md">Trending</h1>
</div>
<JsonDataComponent data={trending}/>
</div>) : <div></div>}
</div>  

</div>
    )
}

export default Stocks