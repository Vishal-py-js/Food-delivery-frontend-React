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
            
            
        </div>
    )
}

export default Checkout
