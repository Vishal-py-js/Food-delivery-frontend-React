import React, {useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'
import axios from 'axios'


const Sidebar = () => {

    const[categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () =>{
        axios.get('http://127.0.0.1:8000/api/food-categories/')
        .then(res=>{
            setCategories(res.data)
            console.log(res.data)
        })
    }
    

  return (
    <Menu className='sidebar'>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Indian
      </a>
      <a className="menu-item" href="/pizzas">
        Italian
      </a>
      <a className="menu-item" href="/desserts">
        American
      </a>
      <a className="menu-item" href="/desserts">
        Chinese
      </a>
      <a className="menu-item" href="/desserts">
        Sweets
      </a>
    </Menu>
  );
};

export default Sidebar