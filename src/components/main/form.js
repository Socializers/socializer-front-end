/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import useFetch from '../hooks/useFetch.js';
import { When } from '../if';
import Modal from '../modal';
import { ModelContext } from '../../context/modal.js';
const ourAPI = 'http://localhost:3030/api/v1/anime';

function Cool (props){
  const context = useContext(ModelContext);
  const[modalList, setModalList] = useState([]);
  const[item, setItem] = useState({});
  const[showDetails, setShowDetails] = useState(false);
  const[details, setDetails] = useState({});
  useFetch(ourAPI, {}, setModalList);

  const handleInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value});
  };

  const callAPI = (url, method = 'get', body, handler, errorHandler) => {
    console.log('__STATE__',handler);
    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => response.json())
      .then(data => typeof handler === 'function' ? handler(data) : null)
      .catch( e => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e));
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const _updateState = newItem => 
      setModalList([...modalList, newItem]);

    callAPI(`${ourAPI}`, 'POST', item, _updateState);
  };

  const deleteItem = id => {

    const _updateState = () => {
      console.log('qqqqqq', modalList);
      console.log('vvvvvv', modalList.filter(item => item._id !== id));
      setModalList( modalList.filter(item => item._id !== id));
    };

    callAPI(`${ourAPI}/${id}`, 'DELETE', undefined, _updateState);
  };

  const updateItem = updatedItem => {

    const _updateState = newItem => setModalList(modalList.map(item => item._id === newItem._id ? newItem : item));

    callAPI(`${ourAPI}/${updatedItem.id}`, 'PUT', updatedItem, _updateState );
  };
  
  const toggleDetails = id => {
    setShowDetails(!showDetails);
    setDetails(modalList.filter(item => item._id === id)[0] || {});
  };

  return (
    <>
      <header>
        {/* <h2>{model}</h2> */}
      </header>

      <section>
        <div className='modal-form'>
          <form onSubmit={addItem}>
            <input name="name" placeholder="item name" onChange={handleInputChange} required />
            <input name="des" placeholder="item des" onChange={handleInputChange} required />
            <button>Add</button>
          </form>
        </div>

        <div className='items'>
          <ul>
            {modalList.map(item => (
              <li key={item._id} >
                {item.name}
                <button onClick={() => toggleDetails(item._id)} >
                  Details
                </button>
                <button onClick={()=> deleteItem(item._id)}>
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={showDetails}>
        <Modal title="To Do Item" close={toggleDetails}>
          <div className="todo-details">
            <div className="item">
              {details.name}
            </div>
            <ul>
              {Object.keys(details).map((property,idx) => {  
                if(idx > 1 && property !== '__v'){
                  return <li key={idx}>{property}: {details[property]}</li>;
                }
              })}
            </ul>
          </div>
        </Modal>
      </When>
    </>
  );
}

export default Cool;