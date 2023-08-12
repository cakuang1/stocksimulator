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
            <h1 className="text-5xl">{data['name']}</h1>
            <div className="border mt-4 mb-4"></div>
        </div>
    )
}
function Box({data}) {

    return (
        <div className="border rounded-2xl p-2 w-96">
            <div className="flex justify-between px-2">
                <div className="ticker">DAY RANGE</div>
                <div>{data['regularMarketDayLow'] + ' - ' + data['regularMarketDayHigh']}</div>
            </div>
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
        <div className="pl-10 pt-4 pr-10">
            <Title data={example}/>
            <div className="flex">
                <Box data={example}/>


            </div>

      </div>
    );
  };


  export default Stock