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
        localStorage.setItem('sectionid', category.id)
        history.push('/filtereditem')
        // const data = await axios.get('http://127.0.0.1:8000/api/filteritem/', {id: category.id})
        // console.log(data)
    }
    

  return (
    <Menu id='sidebar'>
        {
            categories.map(category=>(
                <a onClick={()=>handleId(category)} key={category.id} className="menu-item" href="/">{category.item_category}</a>
            ))
        }
    </Menu>
  );
};

export default Sidebar