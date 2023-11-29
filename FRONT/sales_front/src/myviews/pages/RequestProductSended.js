import { useState } from "react"
import RequestProductSendCard from "../cards/RequestProductSendCard"


const RequestProductValidation=()=> {
    return (
        <>
            {data.map((value, index)=>
                <RequestProductSendCard data={value} key={index}/>
            )}
        </>
    )
}
export default RequestProductValidation
