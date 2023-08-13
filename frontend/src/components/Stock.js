import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";



// Data given b

const example = {'ticker': 'aapl',
'name': 'Apple Inc.',
'postMarketPrice': 195.95,
'postMarketChange': 0.11999512,
'postMarketChangePercent': 0.0006127514,
'regularMarketChange': 2.6100006,
'regularMarketChangePercent': 0.013507921,
'regularMarketPrice': 195.83,
'regularMarketVolume': 48291443,
'regularMarketPreviousClose': 193.22,
'regularMarketDayHigh': 193.22,
'regularMarketDayLow': 193.22,
'marketcap': 3080151367680}




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
            <div className="text-xl font-semibold text-gray-700">{label}</div>
            <div className="text-xl text-gray-500 font-bold">{tag}</div>
        </div>
    );
}




function Box({data}) {
    return (
        <div className="border rounded-2xl p-2 w-96">
            <BoxItem label={'DAY RANGE'} tag={data['regularMarketDayLow'] + ' - ' + data['regularMarketDayHigh']}/>

            <div className="border"></div>
            <div className="flex justify-between px-2">
                <div className="ticker">CLOSE</div>
                <div>{data['regularMarketPreviousClose']}</div>
            </div>
            <div className="border"></div>
            <div className="flex justify-between px-2">
                <div className="ticker">CLOSE</div>
                <div>{data['regularMarketPreviousClose']}</div>
            </div>
            <div className="border"></div>
        </div>
    )
}


function Graph({}) {

    

    return
}








function Stock(){
    const routeparams = useParams()
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/stock/' + 'ticker');
            const data = await response.json();
            // Handle the data obtained from the API call here
            setData(data);
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
        <div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl flex flex-col justify-between'>
        <div className="pl-10 pt-4 pr-10">
            <Title data={example}/>
            <div className="flex">
                <Box data={example}/>

            </div>
        </div>
        <div className="flex  justify-center p-4 mx-10 gap-4 h-40 mb-8">
                <div className="flex items-center justify-center w-80 h-full rounded-lg bg-green-50 text-3xl font-semibold text-green-800 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    Trade
                </div>
                </div>
      </div>
    );
  };


  export default Stock