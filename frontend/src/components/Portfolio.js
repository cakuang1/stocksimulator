import React from 'react';
import { useState,useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';







const StockCards = ({data}) => {
    return (   
      <Link to = {data.id}>
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
</Link>  
    )
}

function Portfolio(){
  const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
  const [costBasis, setCostBasis] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [increase,setIncrease] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mySet = new Set();
        if (purchases.length > 0) {
          purchases.forEach(element => {
            mySet.add(element.ticker);
          });
          const setToArray = [...mySet];
          const setString = setToArray.join(',');
          const response = await fetch(`http://127.0.0.1:8000/api/portfolio/${setString}/`);
          const data = await response.json();

          const costBasisValue = purchases.reduce((accumulator, currentElement) => {
            const totalAsNumber = parseFloat(currentElement.total);

            return accumulator + totalAsNumber;
          }, 0);
          let numValue = parseFloat(costBasisValue);
          let roundedValue = numValue.toFixed(2)
          setCostBasis(roundedValue);

          const portfolioValueSum = purchases.reduce((accumulator, currentElement) => {
            const amount = currentElement.ammountbought;
            const tick = currentElement.ticker;
            const currentPrice = data[tick].regularMarketPrice* amount;

            return accumulator + currentPrice;
          }, 0);
          let portfolio = parseFloat(portfolioValueSum);
          let ro = portfolio.toFixed(2)
          setPortfolioValue(ro);
        }
        if (portfolioValue < costBasis) {
            setIncrease(false)
        }
      } catch (error) {
        // Handle error if the API call fails
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [purchases]);

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
        {costBasis}
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
        {portfolioValue}
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
      <span className={increase ?'text-green-500':'text-red-500'}>${(portfolioValue - costBasis).toFixed(2)}</span>
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
        <span className={increase?'text-green-500':'text-red-500'}>%{(((portfolioValue - costBasis) / costBasis) * 100).toFixed(2)}</span>
      </p>
    </div>

    </div>

  </div>
</div>
{purchases.length > 0 ?<div className="grid grid-cols-3 gap-10 px-9 pt-10">
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