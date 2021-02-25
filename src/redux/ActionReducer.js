import {FETCH_CART_ITEMS} from './Actiontype'

const initialState = {
    items: []
}

const itemsReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_CART_ITEMS: return {
            ...state,
            items: action.payload
        }

        default: return state
    }
}

export default itemsReducer