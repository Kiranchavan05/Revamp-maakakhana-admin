import { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
    // const url="http://localhost:4000"
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category: "veg_menu"

    })

    const onChangeHandler = (event) =>{
        const name= event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler =async (event)=>{
        event.preventDefault()
        const formData =new FormData()
        formData.append("name",data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response=await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category: "veg_menu"
            })
            setImage(false)
            toast.success(response.data.message)

        }else{
            toast.error(response.data.message)
        }
    }
    

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />

            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select name="category" onChange={onChangeHandler} >
                        <option value="Salad">Salad</option>
                        <option value="Rice-Based Dishes">Rice-Based Dishes</option>
                        <option value='Flatbreads and Curries'>Flatbreads and Curries</option>
                        <option value='Dal and Sides'>Dal and Sides</option>
                        <option value='South Indian Special'>South Indian Special</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Accompaniments">Accompaniments</option>
                        <option value="Lunch Delights">Lunch Delights</option>
                        <option value="Lunch Comforts">Lunch Comforts</option>
                        <option value="Maa Ka Khana Special">Maa Ka Khana Special</option>
                        

                        {/* <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option> */}
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input type="Number" onChange={onChangeHandler} value={data.price} name='price' placeholder='₹ 20/-' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
