import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'
import BaseURL from './Constants'


function CategorizedItem() {

    const[filtereditems, setFilteredItems] = useState([])
    const[length, setLength] = useState('')
    const[userid, setUserId] = useState('')

    useEffect(() => {
        
        getItems()
        getUser()
    }, [])
    
    const getItems = () => {
        let id = localStorage.getItem('sectionid')
        axios.post(`${BaseURL}filteritem/`, {id: id})
        .then(res => {
            setFilteredItems(res.data)
            setLength(res.data.length)
            // console.log(res.data.length)
        })
        document.getElementById('cart-total').innerHTML = localStorage.getItem('item-count')
        let innhtml = document.getElementById('user-status')
        if (localStorage.getItem('Token')) {
            innhtml.innerHTML = '<a href="/login" class="btn btn-warning">Logout</a>'
            innhtml.onclick = () => localStorage.removeItem('Token')
        }
    }

    const getUser = async() => {
        
        const data = await axios.get(`${BaseURL}users/`,{
            headers:{
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
        // console.log(data.data[0].id)
        // console.log(data.data[0].username)        
        setUserId(data.data[0].id)
    }

    const addToCart = async(product) => {
        await axios.post(`${BaseURL}add-to-cart/`, {
            slug: product.slug,
            id: userid
        },
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
            <h5>Found {length} items</h5>
            <div className='row'>
                {
                    filtereditems.map(product => (
                        <div key={product.id} className='col-lg-4'>
                            <img className='thumbnail' src={product.image}></img>
                            <div className='box-element product'>
                                <h6><strong>{product.title}</strong></h6>
                                <hr></hr>
                                <button onClick={()=>addToCart(product)} className="btn btn-outline-secondary add-btn">Add to Cart</button>
                                <a className='btn btn-outline-success'>View</a>
                                <h6 id='price'>Rs {product.price}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategorizedItem
