import React from "react";

function About() {






    return (
        <div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl '>
            <div className="title ">
                <h1 className="">About</h1>
            </div>
            <div>
                <h2 className="font-bold">stocksimulator</h2>
                <div>
                    <p> stocksimulator is a web application to build your stock portfolios. Simply search for your favorite stocks and purchase the amount you want to buy. It will appear in your portfolio and
                        which will give you real time updates on how your stocks are doing.
                    </p>
                </div>
            </div>
            <div>
                <h2 className="font-bold">How it works</h2>
                <div>
                    <p>Stock metrics are scraped using an external API called yahooquery</p>


                </div>
            </div>
            <div>
                <h2 className="font-bold">Credits</h2>
                <div>
                    <p></p>


                </div>
            </div>


        </div>


    )
}