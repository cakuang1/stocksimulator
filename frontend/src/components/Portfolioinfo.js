import React from "react";
import { useParams,Link} from "react-router-dom";
import { useEffect ,useState} from "react";


function Portfolioinfo() {
    let params = useParams();
    const [curr, setCurr] = useState(0);
    const [value, setValue] = useState(null);
    useEffect(() => { 
        const fetchData = async () => {
          try {
            let id = params.portfolioid
            const purchases = JSON.parse(localStorage.getItem('purchases')) || []
            let frame = null
            purchases.forEach(element => {
                if (element.id === id) {
                    frame = element
                }
            })  
            const ticker = frame.ticker
            console.log(frame)
            setCurr(frame)
            const response = await fetch(`http://127.0.0.1:8000/api/portfolio/${ticker}`);
            const test = await response.json();
            console.log(test)
            setValue(test)

          } catch (error) {
            // Handle error if the API call fails
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

      function handleSell() {
        const purchases = JSON.parse(localStorage.getItem('purchases')) || []
        


      }
      return(
<div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl '>
        {value ? (
        <div className="">
            <div className="w-5/12 mt-40 mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="font-bold text-2xl mb-2">Purchase ID: {curr.id}</h1>
          <p className="mb-1 font-semibold text-2xl">Ticker: {curr.ticker}</p>
          <p className="mb-1 font-semibold text-2xl">Name: {curr.name}</p>
          <p className="mb-1 font-semibold text-2xl">Amount Bought: {curr.amomuntbought}</p>
          <p className="mb-1 font-semibold text-2xl">Purchase Price: ${curr.boughtfor}</p>
          <p className="mb-1 font-semibold text-2xl">Purchase Date: {curr.purchasedate}</p>
          <p className="mb-1 font-semibold text-2xl">Purchase Total: ${curr.total}</p>
          <p className="mb-1 font-semibold text-2xl">Current Price:  ${value ? value[curr.ticker].regularMarketPrice : ' ' }</p>
          <p className="mb-1 font-semibold text-2xl">Current Total:  ${value ? value[curr.ticker].regularMarketPrice * parseInt(curr.ammountbought): ' ' }</p>
          <div class="flex items-center space-x-4 mt-3 gap-4 h-40 justify-center">
              <div className='text-center border rounded h-36 w-40'>
                <p class="mb-2 text-2xl font-medium text-gray-600 dark:text-gray-400 mt-4">
                  Price Difference
                </p>
                <p class="text-2xl font-bold text-gray-700 dark:text-gray-200">
                <span className={(value[curr.ticker].regularMarketPrice * parseInt(curr.ammountbought) - curr.total ) < 0 ? 'text-red-500' : 'text-green-500'}>${value ?( value[curr.ticker].regularMarketPrice - curr.boughtfor ).toFixed(2)  : ' ' }</span>
                </p>
              </div>
              <div className='text-center border rounded h-36 w-40'>
                <p class="mb-2 text-2xl font-medium text-gray-600 dark:text-gray-400 mt-4">
                    Total Difference
                </p>
                <p class="text-2xl font-bold text-gray-700 dark:text-gray-200">
                <span className={(value[curr.ticker].regularMarketPrice * parseInt(curr.ammountbought) - curr.total ) < 0 ? 'text-red-500' : 'text-green-500'}>${value ?(value[curr.ticker].regularMarketPrice * parseInt(curr.ammountbought) - curr.total ).toFixed(2)  : ' ' }</span>
                </p>
              </div>
              <div className='text-center border rounded h-36 w-40'>
                <p class="mb-2 text-2xl font-medium text-gray-600 dark:text-gray-400 mt-4">
                  Change Percentage
                </p>
                <p class="text-2xl font-bold text-gray-700 dark:text-gray-200">
                <span className={(value[curr.ticker].regularMarketPrice * parseInt(curr.ammountbought) - curr.total ) < 0 ? 'text-red-500' : 'text-green-500'}>%{value ?((value[curr.ticker].regularMarketPrice * parseInt(curr.ammountbought) - curr.total)/curr.total).toFixed(3)  : ' ' }</span>
                </p>
              </div>


            </div>
              <div className="flex justify-center">
                <Link to={'/'}>
                    <div className=" text-3xl border h-32 w-72 flex items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>

                            </div>
                            </Link>

                    <div className="border h-32 text-3xl font-semibold w-72 flex items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:shadow-lg bg-red-200" >
                                SELL
                      </div>

                </div>

            </div>

        </div>) : <div></div>}



</div>
      )







}

export default Portfolioinfo