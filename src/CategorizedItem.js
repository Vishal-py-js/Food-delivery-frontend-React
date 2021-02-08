import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'
import BaseURL from './Constants'
import {useLocation} from 'react-router-dom'


function CategorizedItem() {

    const[filtereditems, setFilteredItems] = useState([])
    const url = 'http://127.0.0.1:8000' //change this manually when deploying, since it is not the same as BaseURL
    const location = useLocation()

    useEffect(() => {
        
        getItems()
    }, [])
    
    const getItems = () => {
        let id = localStorage.getItem('sectionid')
        axios.post(`${BaseURL}filteritem/`, {id: id})
        .then(res => {
            setFilteredItems(res.data)
            console.log(res.data)
        })
        document.getElementById('cart-total').innerHTML = localStorage.getItem('item-count')
        let innhtml = document.getElementById('user-status')
        if (localStorage.getItem('Token')) {
            innhtml.innerHTML = '<a href="/login" class="btn btn-warning">Logout</a>'
            innhtml.onclick = () => localStorage.removeItem('Token')
        }
    }

    return (
        <div className='container' id="page-wrap">
            <div className='row'>
                {
                    filtereditems.map(product => (
                        <div key={product.id} className='col-lg-4'>
                            <img className='thumbnail' src={`${url}${product.image}`}></img>
                            <div className='box-element product'>
                                <h6><strong>{product.title}</strong></h6>
                                <hr></hr>
                                <button className="btn btn-outline-secondary add-btn">Add to Cart</button>
                                <a className='btn btn-outline-success'>View</a>
                                <h6 style={{display: "inline-block", float: "right"}}>{product.price}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategorizedItem
