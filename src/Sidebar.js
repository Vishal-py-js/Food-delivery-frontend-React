import React, {useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'
import axios from 'axios'
import  { useHistory } from 'react-router-dom'
import BaseURL from './Constants'


const Sidebar = () => {

    const[categories, setCategories] = useState([])
    const history = useHistory()


    useEffect(() => {
        getCategories()
        
    }, [])

    const getCategories = () =>{
        axios.get(`${BaseURL}food-categories/`)
        .then(res=>{
            setCategories(res.data)
        })
    }

    const handleId = (category) => {
        localStorage.setItem('sectionid', category.id);
    }
    

  return (
    <Menu id='sidebar'>
        <a href="/">Home</a>
        {
            categories.map(category=>(
                <a onClick={()=>handleId(category)} key={category.id} className="menu-item" href="/filtereditem">{category.item_category}</a>
            ))
        }
    </Menu>
  );
};

export default Sidebar