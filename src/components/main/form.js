/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useContext} from 'react';
import { FaFeather, FaSave } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import $ from 'jquery';
import useFetch from '../hooks/useFetch.js';
import { When } from '../if';
import Modal from '../modal';
import { ModelContext } from '../../context/modal.js';
import ConfirmButton from './confirmButton.js';
const If = props => {
  return props.condition ? props.children : null;
};

const ourAPI = 'http://localhost:3030/api/v1';

function Cool (props){
  const context = useContext(ModelContext);
  const[modalList, setModalList] = useState([]);
  const[item, setItem] = useState({});
  const[showDetails, setShowDetails] = useState(false);
  const[details, setDetails] = useState({});
  const[showField, setShowField] = useState(false);
  useFetch(`${ourAPI}/${context.model}`, {}, setModalList);

  const handleInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value});
  };

  const callAPI = (url, method = 'get', body, handler, errorHandler) => {
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

    const addForm = $('#addForm').serializeArray();

    addForm.forEach( oneProp => {
      setItem({...item, [oneProp.name]: oneProp.value});
    });

    const _updateState = newItem => 
      setModalList([...modalList, newItem]);

    callAPI(`${ourAPI}/${context.model}`, 'POST', item, _updateState);
  };

  const deleteItem = id => {

    const _updateState = () => {
      setModalList( modalList.filter(item => item._id !== id));
    };

    callAPI(`${ourAPI}/${context.model}/${id}`, 'DELETE', undefined, _updateState);
  };

  const updateItem = e => {
    e.preventDefault();

    setShowField(!showField);
    setShowDetails(!showDetails);

    const updatedItem = $('#updateForm').serializeArray();
    
    updatedItem.forEach( oneProp => {
      setItem({...item, [oneProp.name]: oneProp.value});
    });

    const _updateState = newItem => setModalList(modalList.map(item => item._id === newItem._id ? newItem : item));

    callAPI(`${ourAPI}/${context.model}/${details._id}`, 'PUT', item, _updateState );
  };

  const handleUpdate = () => {
    setShowField(!showField);
  };

  const handleNewField = () => {
    $('#updateForm ul').append(`<li>${$('#newField').val()}: <input class='newInput' name=${$('#newField').val()} /></li>`);
    $('.newInput').on('change', handleInputChange);

    $('#newAddField').before(`<input class='newAddInput' name=${$('#newAddField').val()} placeholder=${$('#newAddField').val()} />`);
    $('.newAddInput').on('change', handleInputChange);
  };
  
  const toggleDetails = id => {
    setShowDetails(!showDetails);
    setDetails(modalList.filter(item => item._id === id)[0] || {});
  };

  return (
    <>
      <section>
        <div className='modal-form'>
          <form id='addForm' onSubmit={addItem}>
            <input name="name" placeholder="item name" onChange={handleInputChange} required />
            <input name="des" placeholder="item des" onChange={handleInputChange} required />
            <input id='newAddField' placeholder='new field' /> <button type='button' onClick={handleNewField}>add field</button>
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
                <ConfirmButton
                  dialog={['Delete', 'Are You Sure?', 'Once more to delete']}
                  action={() => deleteItem(item._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={showDetails}>
        <Modal title="To Do Item" close={toggleDetails}>
          <div className="todo-details">
            <If condition={!showField}>
              <div className="item">
                {details.name} <FaFeather onClick={handleUpdate} />
              </div>
              <ul>
                {Object.keys(details).map((property,idx) => {
                  if(idx > 1 && property !== '__v'){
                    return <li key={idx}>{property}:{' '}
                      <span> {details[property]}</span>
                    </li>;
                  }
                })}
              </ul>
            </If>
            <If condition={showField}>
              <form id='updateForm' onSubmit={updateItem}>
                <ul>
                  {Object.keys(details).map((property,idx) => {
                    if(property !== '__v' && property !== '_id'){
                      return <li key={idx}>{property}:{' '}
                        <input onChange={handleInputChange} name={property} defaultValue={details[property]} /> 
                      </li>;
                    }
                  })}
                </ul>
                <input id='newField' /> <button type='button' onClick={handleNewField}>add field</button>
                <button><FaSave /></button>
              </form>
            </If>
          </div>
        </Modal>
      </When>
    </>
  );
}

export default Cool;