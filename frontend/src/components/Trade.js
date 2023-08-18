import {React, useState,useEffect } from "react";

import { useNavigate, Link,useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function Trade() {
    const navigate = useNavigate()
    const handlePurchase = () => {
        if (isNaN(quantity) || quantity <= 0) {
            // Throw an error if quantity is not a positive integer
            setErrorMessage('Invalid quantity. Please enter a positive integer.');
            return
          }
          if (quantity > 100) {
            setErrorMessage('Quantity cannot exceed 100.');
            return; // Exit the function if there's an error
          }
      
          const purchaseData = {
            id: uuidv4(),
            ticker: data.box.ticker,
            name: data.box.name,
            purchasedate: new Date().toISOString(),
            boughtfor: data.top.regularMarketPrice,
            ammountbought: quantity.toString(), // Store quantity as a string
            total: (quantity * data.top.regularMarketPrice).toString(), // Calculate total price
          };
    
        // Retrieve existing purchases from Local Storage or initialize an empty array
        const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    
        // Add the new purchase to the array
        storedPurchases.push(purchaseData);
    
        // Store the updated array in Local Storage
        localStorage.setItem('purchases', JSON.stringify(storedPurchases));
    
        // You can also redirect the user to a confirmation page or perform other actions
        navigate(`/?message=Purchase%20${purchaseData.id}%20made`)

      };
    let params = useParams();
    const [data, setData] = useState(null)
    useEffect(() => { 
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/ticker/${params.ticker}/`);
          const test = await response.json();

          console.log(test)
          console.log(test.box)
          // Handle the data obtained from the API call here
          setData(test);
          // You can use the "data" variable within this scope or call another function to handle the data.
        } catch (error) {
          // Handle error if the API call fails
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    const [quantity, setQuantity] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
        setErrorMessage('')
      };
    return (

    <div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl flex flex-col justify-between'>
            {data?
            (    <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h1 className="text-8xl font-semibold mb-4">Purchase {data.box.ticker.toUpperCase()}</h1>
              <h2 className="text-3xl mb-2 font-semibold text-gray-500">Current Price: <span className="text-green-500">${data.top.regularMarketPrice}</span> </h2>
                    <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="quantity">
                    Number of Stocks to Purchase
                </label>
                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </div>
                <div className="flex justify-center">
                    <Link to = {'/stocks/' + data.box.ticker}>
                    <div className=" text-3xl border h-32 w-72 flex items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>

                            </div>
                    </Link>

                    <div className="border h-32 text-3xl font-semibold w-72 flex items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:shadow-lg bg-green-200" onClick={handlePurchase}>
                                PURCHASE
                            </div>

                </div>

            </div>
          </div>) : (<div></div>)}
        </div>


    )





}

export default Trade