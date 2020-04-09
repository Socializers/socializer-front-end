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

import './form.scss';

const If = props => {
  return props.condition ? props.children : null;
};

const ourAPI = 'http://localhost:3030/api/v1';

function Cool (props){
  const context = useContext(ModelContext);
  const[itemsList, setItemsList] = useState([]);
  const[item, setItem] = useState({});
  const[showDetails, setShowDetails] = useState(false);
  const[details, setDetails] = useState({});
  const[showField, setShowField] = useState(false);
  useFetch(`${ourAPI}/${context.modelName}`, {}, setItemsList);

  useEffect (() => {
    const header = document.querySelector('header');
    const sectionOne = document.querySelector('.zero-section-form');

    const sectionOneOptions = {
      rootMargin: '-70px 0px 0px 0px',
    };

    const sectionOneObserver = new IntersectionObserver(function(
      entries,
      sectionOneObserver,
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add('nav-scrolled');
        } else {
          header.classList.remove('nav-scrolled');
        }
      });
    },
    sectionOneOptions);
    
    sectionOneObserver.observe(sectionOne);

    const slider = document.querySelectorAll('.slide-in');

    const appearOptions = {
      threshold: 0,
      rootMargin: '0px 0px -50px 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);

    slider.forEach(slider => {
      appearOnScroll.observe(slider);
    });

  });

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
      setItemsList([...itemsList, newItem]);

    callAPI(`${ourAPI}/${context.modelName}`, 'POST', item, _updateState);
  };

  const deleteItem = id => {

    const _updateState = () => {
      setItemsList( itemsList.filter(item => item._id !== id));
    };

    callAPI(`${ourAPI}/${context.modelName}/${id}`, 'DELETE', undefined, _updateState);
  };

  const updateItem = e => {
    e.preventDefault();

    setShowField(!showField);
    setShowDetails(!showDetails);

    const updatedItem = $('#updateForm').serializeArray();
    
    updatedItem.forEach( oneProp => {
      setItem({...item, [oneProp.name]: oneProp.value});
    });

    const _updateState = newItem => setItemsList(itemsList.map(item => item._id === newItem._id ? newItem : item));

    callAPI(`${ourAPI}/${context.modelName}/${details._id}`, 'PUT', item, _updateState );
  };

  const handleUpdate = () => {
    setShowField(!showField);
  };

  const handleNewField = () => {
    $('#newAddField').before(`<input class='newAddInput' name=${$('#newAddField').val()} placeholder=${$('#newAddField').val()} />`);
    $('.newAddInput').on('change', handleInputChange);
  };

  const handleNewFieldUpdate = () =>{
    $('#updateForm ul').append(`<li>${$('#newField').val()}: <input class='newInput' name=${$('#newField').val()} /></li>`);
    $('.newInput').on('change', handleInputChange);
  };
  
  const toggleDetails = id => {
    setShowDetails(!showDetails);
    setDetails(itemsList.filter(item => item._id === id)[0] || {});
  };

  return (
    <>
      <section className='zero-section-form'></section>

      <section className='first-section-form'>
        <div className='model-form'>
          <form id='addForm' onSubmit={addItem}>
            <input name="name" placeholder="item name" onChange={handleInputChange} required />
            <input name="des" placeholder="item des" onChange={handleInputChange} required />
            <input id='newAddField' placeholder='new field' /> 
            <button className='newFieldButton' type='button' onClick={handleNewField}>add field</button>
            <button>Add</button>
          </form>
        </div>

        <div className='items'>
          <ul>
            {itemsList.map(item => (
              <li className='from-right slide-in' key={item._id} >
                <p onClick={() => toggleDetails(item._id)}>{item.name}</p>
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
        <Modal title="Item Details" close={toggleDetails}>
          <div className="item-details">
            <If condition={!showField}>
              <div className="item">
                {details.name} <FaFeather className='feather' onClick={handleUpdate} />
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
                <button className='save'><FaSave /></button>
                <ul>
                  {Object.keys(details).map((property,idx) => {
                    if(property !== '__v' && property !== '_id'){
                      return <li key={idx}>{property}:{' '}
                        <input onChange={handleInputChange} name={property} defaultValue={details[property]} /> 
                      </li>;
                    }
                  })}
                </ul>
                <input placeholder='New Field ? Name It PLZ' id='newField' /> <button className='new' type='button' onClick={handleNewFieldUpdate}>add field</button>
              </form>
            </If>
          </div>
        </Modal>
      </When>
    </>
  );
}

export default Cool;