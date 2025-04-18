import { useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const List = ({url}) => {
    // const url="http://localhost:4000"
    const [list, setList]=useState([])

    const FetchList =async()=>{
        const response = await axios(`${url}/api/food/list`)
        console.log(response.data)
        if(response.data.success){
            setList(response.data.data)
        }else{
            toast.error("Error")
        }
    }

    useEffect(()=>{
        FetchList()
    }, [])
    const removeFood =async (foodId)=>{
        // console.log(foodId)
        const response=await axios.post(`${url}/api/food/remove`, {id:foodId})
        
        await FetchList()
        if(response.data.success){
            toast.success(response.data.message)
        }else{
            toast.error("Error")
        }
       

    }

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
            <div className="list-table-formate title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>

            </div>
            {list.map((item,index)=>{
                return (
                    <div key={index} className='list-table-formate'>
                        <img src={`${url}/images/`+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>₹{item.price}</p>
                        <p onClick={()=>{
                            removeFood(item._id)
                        }} className='cursor'>X</p>


                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default List
