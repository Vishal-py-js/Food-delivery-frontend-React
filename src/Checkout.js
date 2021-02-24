import React, {useState} from 'react'
import './App.css'

function Checkout() {

    const[address, setAddress] = useState({
        address: '',
        city: '',
        state: '',
        zipcode: ''
    })

    return (
        <div className='container'>
            <br />
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
            
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='box-element'>
                        <a className='btn btn-outline-dark'>Back to Cart</a>
                        <hr />
                        <h3>Order Summary</h3>
                        <hr/>
                        <div className="cart-row">
                            <div style={{"flex":"2"}}><img className="row-image"/></div>
                            <div style={{"flex":"2"}}><p>item 1</p></div>
                            <div style={{"flex":"1"}}><p>item 2</p></div>
                            <div style={{"flex":"1"}}><p>item 3</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
