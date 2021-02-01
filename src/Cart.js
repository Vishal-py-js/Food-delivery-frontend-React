import React, {useState, useEffect} from 'react'
import arrowup from './arrow-up.png'
import arrowdown from './arrow-down.png'
import axios from 'axios'
import './App.css';


function Cart() {

    const[cart, setCart] = useState([])
    const[total, setTotal] = useState('')
    const[userId, setUserId] = useState('')

    useEffect(() => {
        getCartItems()
    }, [])

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }

    let csrftoken = getCookie('csrftoken')

    const getCartItems = async() => {
        const data = await axios.get('http://127.0.0.1:8000/api/order-items/',{
            headers:{
                // 'Authorization': `Token 95f67b1c18ee24e77231a7c3a60ec586f866219f` Add authorization token generated from login page, currently using modheader
            }
        })
        console.log(data.data)
        await setCart(data.data)
    }


    const increaseItem = async(cartitem) => {
        await axios.put(`http://127.0.0.1:8000/api/cart/${cartitem.id}/`, {quantity: cartitem.quantity+1, 'X-CSRFToken':csrftoken})
        window.location.reload()
    }

    const decreaseItem = async(cartitem) => {
        if(cartitem.quantity == 1){
            await axios.delete(`http://127.0.0.1:8000/api/cart/${cartitem.id}/`, {'X-CSRFToken':csrftoken})
        }else {
            await axios.put(`http://127.0.0.1:8000/api/cart/${cartitem.id}/`, {quantity: cartitem.quantity-1, 'X-CSRFToken':csrftoken})
        }
        window.location.reload()
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <a className='btn btn-outline-dark' href='#'>&#x2190; Continue Ordering</a>

                    <br/>
                    <br/>
                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th><h5>Items: <strong></strong></h5></th>
                                <th><h5>Total: <strong>{total}</strong></h5></th>
                                <a style={{float: 'right', margin: '5px'}} className="btn btn-success" href="#">Checkout</a>
                            </tr>
                        </thead>
                    </table>
                    
                </div>

                <br/>

                <div className='cart-box-element'>
                    <div className='cart-row'>
                    <div style={{flex: 2}}></div>
                        <div style={{flex: 2}}><strong>Item</strong></div>
                        <div style={{flex: 1}}><strong>Price</strong></div>
                        <div style={{flex: 1}}><strong>Quantity</strong></div>
                        <div style={{flex: 1}}><strong>Total</strong></div>
                    </div>
                    {
                        cart.map(cartitem => (
                            <div className='cart-row' key={cartitem.item.id}>
                                <div style={{flex: "2"}}><img className="row-image" src={cartitem.item.image}/></div>
                                <div style={{flex: "2"}}>{cartitem.item.title}</div>
                                <div style={{flex: "1"}}>{cartitem.item.price}</div>
                                <div style={{flex: "1"}}>
                                <p className='quantity'>{cartitem.quantity}</p>
                                    <div className='quantity'>
                                        <img onClick={() => increaseItem(cartitem)} className="chg-quantity update-cart" src={arrowup}></img>
                                        <img onClick={() => decreaseItem(cartitem)} className="chg-quantity update-cart" src={arrowdown}></img>
                                    </div>
                                </div>
                                <div style={{flex: "1"}}>{cartitem.quantity * cartitem.item.price}</div>
                                <h3></h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart
