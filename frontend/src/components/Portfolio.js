import React from 'react';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';






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
  const [toppers, setToppers] = useState([0,0,0,0])
    useEffect(() => { 
      const fetchData = async () => {
        try {
          const mySet = new Set();
          const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
          if (purchases.length > 0) {
          purchases.forEach(element => {
            mySet.add(element.ticker)
          });
          const setToArray = [...mySet];
          const setString = setToArray.join(',');
          const response = await fetch(`http://127.0.0.1:8000/api/portfolio/${setString}/`);
          const costbasis = response.reduce((accumulator, currentElement) => {
            return accumulator + currentElement.total;
          }, 0);
          const portfoliovalue = response.reduce((accumulator, currentElement) => {
            const ammountbought = currentElement.ammountbought
            const currentstockprice = 
            const



            return accumulator + currentElement.;
          }, 0);
          }
          
          
        } catch (error) {
          // Handle error if the API call fails
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    return (
<div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl '>
<div class="flex justify-center mt-10">
<div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">

    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        COST BASIS
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        {toppers[0]}
      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">

    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        PORTFOLIO VALUE
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        {toppers[0]}
      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">

    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        PORTFOLIO CHANGE
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        ${toppers[1]}
      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        CHANGE PERCENTAGE
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        %{toppers[2]}
      </p>
    </div>
    </div>
  </div>
</div>
{purchases.length > 0?<div className="grid grid-cols-3 gap-10 px-9 pt-10">
{purchases.map((purchase) => (
        <StockCards key={purchase.id} data={purchase} />
      ))}
</div> : <div className='flex justify-center items-center text-3xl font-bold text-gray-400 text-center h-96 '>
  No Purchases Have Been Made
</div>}





</div>
    );
  };

  export default Portfolio