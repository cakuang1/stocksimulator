import React from "react";
import { useLocation } from "react-router-dom";



function Trade() {
    const location = useLocation();

    // Access the additional data or props
    const additionalProps = location.state;
    return (

<div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl flex flex-col justify-between'>

        <div>
            <h1>Purchase</h1>
            
        </div>




    </div>


    )





}

export default Trade