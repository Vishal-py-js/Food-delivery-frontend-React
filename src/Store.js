import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import BaseURL from './Constants'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner"


const Store = () => {

    const[products, setProducts] = useState([])
    const[id, setId] = useState('')
    const[loading, setLoading] = useState(true)
    
    useEffect(() => {
        getProducts()
        .then(()=>{
            setLoading(false)
        })
        getUser()
    }, [])

    const getProducts = async() => {
        const data = await axios.get(BaseURL)
        // console.log(data.data)
        setProducts(data.data.Item)
    }

    const getUser = async() => {
        const data = await axios.get(`${BaseURL}users/`,{
            headers:{
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
        // console.log(data.data[0].id)
        // console.log(data.data[0].username)
        let user = data.data[0].username
        setId(data.data[0].id)

        document.getElementById('cart-total').innerHTML = localStorage.getItem('item-count')
        let innhtml = document.getElementById('user-status')
        if (localStorage.getItem('Token')) {
            innhtml.innerHTML = `<strong>${user}</strong> <a href="/login" class="btn btn-warning">Logout</a>`
            innhtml.onclick = () => localStorage.removeItem('Token')
        } 
    }


    const addToCart = async(slug, id) => {
        await axios.post(`${BaseURL}add-to-cart/`, {slug, id},
        {
            headers:{
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        }
            )
        window.location.reload()
    }

    return ( 
        <div className='container' id="page-wrap">
            <div className='row'>
                {
                    products.map(product => (
                        <div key={product.id} className='col-lg-3'>
                            <img className='thumbnail' src={product.image}></img>
                            <div className='box-element product'>
                                <h6><strong>{product.title}</strong></h6>
                                <hr></hr>
                                <button onClick={()=>addToCart(product.slug, id)} className="btn btn-outline-secondary add-btn">Add to Cart</button>
                                {/* <a className='btn btn-outline-success'>View</a> */}
                                <h6 id='price'>Rs {product.price}</h6>
                            </div>
                            <hr/>
                        </div>
                    ))   
                }
                {
                    loading?<div>
                        <Loader type="Hearts" color="#00BFFF" height={100} width={100} timeout={6000} 
                        />
                        <p>The backend is hosted on heroku with free dynos which goes to sleep after 30 minutes of inactivity. It might take a while to completely load this page, Please hang in there.</p>
                            </div>:''
                }
            </div>
        </div>
    )
}

export default Store
