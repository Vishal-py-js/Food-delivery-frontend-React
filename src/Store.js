import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';


const Store = () => {

    const[products, setProducts] = useState([])
    const[id, setId] = useState('')
    
    
    useEffect(() => {
        getProducts()
        getUser()
    }, [])


    const getProducts = async() => {
        
        const data = await axios.get('http://127.0.0.1:8000/api/')
        console.log(data.data)
        setProducts(data.data.Item)
    }

    const getUser = async() => {
        
        const data = await axios.get('http://127.0.0.1:8000/api/users/',{
            headers:{
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
        console.log(data.data[0].id)
        setId(data.data[0].id)
        
    }


    const addToCart = async(slug, id) => {
        await axios.post('http://127.0.0.1:8000/api/add-to-cart/', {slug, id},
        {
            headers:{
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        }
            )
    }

    return (
        <div className='container'>
            <div className='row'>
                {
                    products.map(product => (
                        <div key={product.id} className='col-lg-4'>
                            <img className='thumbnail' src={product.image}></img>
                            <div className='box-element product'>
                                <h6><strong>{product.title}</strong></h6>
                                <hr></hr>
                                <button onClick={()=>addToCart(product.slug, id)} className="btn btn-outline-secondary add-btn">Add to Cart</button>
                                <a className='btn btn-outline-success'>View</a>
                                <h4 style={{display: "inline-block", float: "right"}}>{product.price}</h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Store
