import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import {fetchitems} from './redux/Action'

function Checkout({itemData, fetchitems}) {

    useEffect(() => {
        fetchitems()
        let innhtml = document.getElementById('user-status')
        // document.getElementById('cart-icon').src = './cart.png'
        document.getElementById("cart-total").innerHTML = localStorage.getItem('item-count')
        if (localStorage.getItem('Token')) {
            innhtml.innerHTML = '<a href="/login" class="btn btn-warning">Logout</a>'
            innhtml.onclick = () => localStorage.removeItem('Token')
        } else {
            innhtml.innerHTML = "LogIn"
        }
        
    }, [])

    // const[address, setAddress] = useState({
    //     address: '',
    //     city: '',
    //     state: '',
    //     zipcode: ''
    // })

    // document.getElementById("cart-total").innerHTML = data.data.length
    // localStorage.setItem('item-count', data.data.length)
    


    return (
        <div className='container'>
            <br />
            
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='box-element'>
                        <a className='btn btn-outline-dark' href="/cart/">Back to Cart</a>
                        <hr />
                        <h4>Order Summary</h4>
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
                        <form id='form'>
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
                                    <input type='text' name='address' placeholder='Address..' />
                                </div>
                                <div className='form-field'>
                                    <input type='text' name='city' placeholder='City..' />
                                </div>
                                <div className='form-field'>
                                    <input type='text' name='state' placeholder='State..' />
                                </div>
                                <div className='form-field'>
                                    <input type='text' name='zipcode' placeholder='Zipcode..' />
                                </div>
                                <div className='form-field'>
                                    <input type='text' name='country' placeholder='Country..' />
                                </div>
                            </div>
                            <hr/>
                            <input className='btn btn-success btn-block' type='submit' value='Continue' />
                        </form>
                    </div>
                </div>
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