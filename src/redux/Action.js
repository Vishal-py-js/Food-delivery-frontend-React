import {FETCH_CART_ITEMS} from './Actiontype'
import axios from 'axios'
import BaseURL from '../Constants'


export const fetch_cart_items = cartitems => {
    return {
        type: FETCH_CART_ITEMS,
        payload: cartitems
    }
}

export const fetchitems = () => {
    return (dispatch) => {
        axios.get(`${BaseURL}order-items/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
        .then(response => {
            const cartitems = response.data
            dispatch(fetch_cart_items(cartitems))
        })
    }
}


