import React from "react";
import { useNavigate, Link,useParams } from "react-router-dom";



function Portfolioinfo() {
    let params = useParams();
    let id = params.portfoliolid
    const purchases = JSON.parse(localStorage.getItem('purchases')) || []
    let frame = null
    purchases.forEach(element => {
        if 
    })
    

    return (
<div className='innerlayer bg-white h-[calc(100vh-2rem)] w-11/12 m-auto border rounded-2xl '>
    





</div>



    )






}

export default Portfolioinfo