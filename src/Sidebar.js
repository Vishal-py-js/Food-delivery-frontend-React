import React, {useState, useEffect} from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css'
import axios from 'axios'
import BaseURL from './Constants'
import HomeIcon from '@material-ui/icons/Home';


const Sidebar = () => {

    const[categories, setCategories] = useState([])

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
        <a id='home-icon' href="/"><HomeIcon style={{ fontSize: 30 }} /></a>
        <hr color='black' />
        {
            categories.map(category=>(
                <a onClick={()=>handleId(category)} key={category.id} className="menu-item" href="/filtereditem">{category.item_category}</a>
            ))
        }
    </Menu>
  );
};

export default Sidebar