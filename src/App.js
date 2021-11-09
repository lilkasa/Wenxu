import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const App = () => {
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState(null);
  const [item, setItem] = useState([]);

  const handleClick = query => {
    axios
      .get(`https://stream-menu-svc-v3.herokuapp.com//item?category=${query}`)
      .then(res => setItem(res.data))
      .catch(err => setItem(err))
  };

  useEffect(() => {
    axios
      .get(`https://stream-menu-svc-v3.herokuapp.com/category`)
      .then(res => setCategories(res.data))
      .catch(error => setErr(error))
  }, []);

  return (
    <div>
      {err ? (
        <p>error in server</p>
      ) : (
        <div className='containner'>
          <p> My Categories</p>
          <Category categories={categories} handleClick={handleClick} />
          <Menu item={item} />
        </div>
      )}
    </div>
  )
};

const Category = ({ categories, handleClick }) => {
  return (
    <ul className='cata-container'>
      {categories.map(item => (
        <li key={item.id} onClick={() => handleClick(item.short_name)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
};

const Menu = ({ item }) => {
  return (
    <div className='tab-wrapper'>
      {item.length !== 0 && (
        <table className='tab-container'>
          <thead>
              <th>Name</th>
              <th>Description</th> 
          </thead>
          <tbody>
            {item.map(ele => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td>{ele.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default App;
