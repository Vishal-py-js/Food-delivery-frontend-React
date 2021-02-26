import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import {connect} from 'react-redux'
import './App.css'
import BaseURL from './Constants'
import {fetchitems} from './redux/Action'

function Checkout({itemData, fetchitems}) {

    const[myaddress, setMyAddress] = useState({
        address: '',
        city: '',
        state: '',
        zipcode: '',
        user: localStorage.getItem('user-id')
    })

    useEffect(() => {
        getAddresses()
        fetchitems()
        let innhtml = document.getElementById('user-status')
        // document.getElementById('cart-icon').src = './cart.png'
        document.getElementById('home').innerHTML = ''
        document.getElementById('cartt').innerHTML = ''
        document.getElementById("cart-total").innerHTML = ''
        if (localStorage.getItem('Token')) {
            innhtml.innerHTML = '<a href="/login" class="btn btn-warning">Logout</a>'
            innhtml.onclick = () => localStorage.removeItem('Token')
        } else {
            innhtml.innerHTML = "LogIn"
        }
        
    }, [])
    
    const[prevAddress, setPrevAddress] = useState([])

    const getAddresses = () => {
        axios.get(`${BaseURL}address/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
        .then(response => 
            setPrevAddress(response.data) 
        )
    }

    // document.getElementById("cart-total").innerHTML = data.data.length
    // localStorage.setItem('item-count', data.data.length)
    let sumtotal = 0
    itemData.map((item)=>{
        sumtotal += item.get_total
    })

    const submit = async() => {
        await axios.post(`${BaseURL}address/`, myaddress, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
    }


    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='box-element'>
                        <a className='btn btn-outline-dark' href="/cart/">Back to Cart</a>
                        <hr />
                        <div className='order-summary'>
                            <h4>Order Summary</h4>
                            <h4 style={{'float': 'right','marginLeft':'500px'}}>Total : {sumtotal}</h4>
                        </div>
                        <hr/>
                        <div className='cart-box-element'>
                        <div className="cart-row">
                        <div style={{flex: 2}}></div>
                            <div style={{"flex":"2"}}><p>Item</p></div>
                            <div style={{"flex":"1"}}><p>Price</p></div>
                            <div style={{"flex":"1"}}><p>Quantity</p></div>
                            <div style={{"flex":"1"}}><p>Total</p></div>
                        </div>
                        {
                            itemData.map(item => (
                                <div className='cart-row' key={item.item.id}>
                                <div style={{flex: "2"}}><img className="row-image" src={item.item.image}/></div>
                                <div style={{flex: "2"}}>{item.item.title}</div>
                                <div style={{flex: "1"}}>Rs {item.item.price}</div>
                                <div style={{flex: "1"}}>
                                <p className='quantity'>{item.quantity}</p>
                                    
                                </div>
                                <div style={{flex: "1"}}>{item.quantity * item.item.price}</div>
                                <h3></h3>
                            </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-lg-12'>
                    <div className='box-element' id='form-wrapper'>
                        <form onSubmit={submit} id='form'>
                            <div id='user-info'>
                                <div className='form-field'>
                                    <input type='text' name='name' placeholder='Name..'/>
                                </div>
                                <div className='form-field'>
                                    <input type='email' name='email' placeholder='Email..'/>
                                </div>
                            </div>

                            <div className='shipping-info'>
                                <hr/>
                                <p>Shipping Information:</p>
                                <hr/>
                                <div className='form-field'>
                                    <input onChange={e=> setMyAddress({...myaddress, address:e.target.value})} type='text' name='address' value={myaddress.address} placeholder='Address..' />
                                </div>
                                <div className='form-field'>
                                    <input onChange={e => setMyAddress({...myaddress, city:e.target.value})} type='text' name='city' value={myaddress.city} placeholder='City..' />
                                </div>
                                <div className='form-field'>
                                    <input onChange={e => setMyAddress({...myaddress, state:e.target.value})} type='text' name='state' value={myaddress.state} placeholder='State..' />
                                </div>
                                <div className='form-field'>
                                    <input onChange={e => setMyAddress({...myaddress, zipcode:e.target.value})} type='text' name='zipcode' value={myaddress.zipcode} placeholder='Zipcode..' />
                                </div>
                            </div>
                            <hr/>
                            <input className='btn btn-success btn-block' type='submit' value='Continue' />
                        </form>
                    </div>
                </div>
            </div>
            <div className='row'>
                {
                    prevAddress.map(addressitem => (
                        <div key={addressitem.id} className='col-lg-4'>
                            <div className='box-element product'>
                                <h6> Address line: {addressitem.address}</h6>
                                <h6>city: {addressitem.city}</h6>
                                <h6>State: {addressitem.state}</h6>
                                <h6>Zipcode: {addressitem.zipcode}</h6>
                            </div>
                            <br/>
                        </div>
                    ))
                }
            </div>
        </div>
     )
}

const mapStateToProps = state => {
    return {
        itemData: state.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchitems: () => dispatch(fetchitems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
// export default Checkout