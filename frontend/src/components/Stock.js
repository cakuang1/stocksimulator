import { useState,useEffect } from "react";
import { Link, json, useParams } from "react-router-dom";
import Graph from "./Graph";
import SearchBar from "./Searchbar";








function Title({data}) {
    return (
        <div className="">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {data['name']}
            </h1>
            <div className="border-b-2   mb-6"></div>
        </div>
    );
}

function BoxItem({label,tag}) {
    return (
        <div className="bg-white  flex justify-between px-2 h-14  p-4 ">
            <div className="text-xl font-bold text-gray-700">{label}</div>
            <div className="text-xl text-gray-500 font-bold">{tag}</div>
        </div>
    );
}




function Box({data}) {
    return (
        <div className="border rounded-2xl p-2 pb-6 w-5/12 h-auto">
            <BoxItem label={'TICKER'} tag={data.ticker.toUpperCase()}/>
            <BoxItem label={'EXCHANGE'} tag={data.exchange.toUpperCase()}/>
            <BoxItem label={'PREVIOUS CLOSE'} tag={data.regularMarketPreviousClose}/>
            <BoxItem label={'MARKET VOLUME'} tag={data.regularMarketVolume}/>
            <BoxItem label={'MARKET HIGH'} tag={data.regularMarketDayHigh}/>
            <BoxItem label={'MARKET LOW'} tag={data.regularMarketDayLow}/>
            <BoxItem label={'MARKET OPEN'} tag={data.regularMarketOpen}/>
            <BoxItem label={'TRAILING PE'} tag={data.trailingPE}/>
            <BoxItem label={'FORWARD PE'} tag={data.forwardPE}/>
            <BoxItem label={'FIFTY TWO WEEK HIGH'} tag={data.fiftyTwoWeekHigh
}/>
            <BoxItem label={'FIFTY TWO WEEK LOW'} tag={data.fiftyTwoWeekLow
}/>
            <BoxItem label={'BETA'} tag={data.beta}/>
        </div>
    )
}





function Top({data}) {

  const topdata = data.top
  const date = data.date 
  const green = 
  <div class="flex flex-shrink-0 items-center justify-center bg-green-200 h-14 w-16 rounded ml-4">
      <svg class="w-6 h-6 fill-current text-green-700"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>

  </div>

  const red = 
  <div class="flex flex-shrink-0 items-center justify-center bg-red-200 h-14 w-16 rounded ml-4">
  <svg class="w-6 h-6 fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>

  </div>


  const curr = topdata.change == true ? green : red
  const color = topdata.change == true ? 'text-green-400' : 'text-red-800'

  return (
    <div className="pl-10">
      <h2 className="mb-2 text-2xl font-medium text-gray-600 dark:text-gray-400">REGULAR MARKET PRICE (DAY) </h2>
    <div className=" flex">
      <h1 className="font-bold">${topdata.regularMarketPrice}</h1>
      {curr}
      <div className={"flex ml-4 text-4xl font-bold items-center justify-center " + color}>
      <p >${topdata.regularMarketChange}</p>
      <p className="ml-3" >({topdata.regularMarketChangePercent} %)</p>
      </div>
  </div>
  <div className="text-2xl font-medium text-gray-300 dark:text-gray-400">{date}</div>
    </div>

  )

}

function Bottom({data}) {
  return (
<div class="flex pl-10 justify-around">
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
      <div className="p-3 rounded-full  dark:text-orange-100 bg-green-100 dark:bg-orange-500 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        Market Capital
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        {data.marketcap}
      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
      <div className="p-3 rounded-full  dark:text-orange-100 bg-green-100 dark:bg-orange-500 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>

      </div>
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        Price-to-Book Ratio
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        {data.pricetobook}
      </p>
    </div>
    </div>
  </div>
  <div className="h-32 w-96 rounded-lg shadow-xs border ">
    <div className="flex  items-center p-4">
      <div className="p-3 rounded-full  dark:text-orange-100 bg-green-100 dark:bg-orange-500 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

      </div>
    <div>
      <p class="mb-2 text-3xl font-medium text-gray-600 dark:text-gray-400">
        Forward EPS
      </p>
      <p class="text-5xl font-bold text-gray-700 dark:text-gray-200">
        ${data.forwardEps}
      </p>
    </div>
    </div>
  </div>
</div>)
}


function Stock(){
    let params = useParams();
    const [data, setData] = useState(null)
    const [error,setError] = useState(false)
    useEffect(() => { 
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/ticker/${params.ticker}/`);


          if (response.status === 404) {
            setData(null); // Set data to null if 404
            setError(true)
          } else {
            const jsonData = await response.json();
            console.log(jsonData)
            setData(jsonData);
          }
          // You can use the "data" variable within this scope or call another function to handle the data.
        } catch (error) {
          // Handle error if the API call fails
          setError(true)
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [params.ticker]);
    return (
<div className='w-11/12 '>
  <SearchBar />
  <div className='innerlayer bg-white h-[calc(100vh-2rem)]  m-auto border rounded-2xl flex flex-col justify-between mt-2'>
    {data !== null && !error ? (  
      <div>
        <div className="pl-10 pt-4 pr-10">
          <Title data={data.box} />
          <div className="flex h-5/6 text-5xl">
            {data ? (<Box data={data.box} />) : (<div></div>)}
            <div className="h-full w-full"> 
              {data ? (<Top data={data} />) : (<div></div>)}
              {data ? (<Graph data={data} />) : (<div></div>)}
              {data ? (<Bottom data={data.box} />) : (<div></div>)}     
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 mx-10 gap-4 h-40 mb-8">
          <Link to={{ pathname: '/trade/' + data.box.ticker, state: data }}>
            <div className="flex items-center justify-center w-80 h-full rounded-lg bg-green-50 text-3xl font-semibold text-green-800 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              Trade
            </div>
          </Link>
        </div> 
      </div> 
    ) : null}
    
    {error ? (
      <div className="h-screen justify-center flex pt-64 text-5xl text-gray-500 text-bold">
        Stock is currently not supported. Sorry!
      </div>
    ) : null}
  </div>
</div>

    );
  };


  export default Stock