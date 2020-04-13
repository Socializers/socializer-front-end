/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import { FaFeather, FaSave } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import $ from 'jquery';
import useFetch from '../hooks/useFetch.js';
import { When } from '../if';
import Modal from '../modal';
import { ModelContext } from '../../context/modal.js';
import ConfirmButton from './confirmButton.js';

import pic from '../images/homepage/word.jpg';

import './form.scss';

const If = props => {
  return props.condition ? props.children : null;
};

const ourAPI = 'http://localhost:3030/api/v1';

function Cool(props) {
  const context = useContext(ModelContext);
  const [itemsList, setItemsList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showField, setShowField] = useState(false);
  const [fieldsNames, setFieldsNames] = useState(['name', 'des', 'img_url']);

  useFetch(`${ourAPI}/${context.modelName}`, {}, setItemsList);

  useEffect(() => {
    console.log('context', context.modelImg);
    const header = document.querySelector('header');
    const sectionOne = document.querySelector('.zero-section-form');

    const sectionOneOptions = {
      rootMargin: '-5000px 0px 0px 0px',
    };

    const sectionOneObserver = new IntersectionObserver(function (
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
    }, sectionOneOptions);

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
    setItem({ ...item, [e.target.name]: e.target.value });
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
      .catch(e => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e));
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const addForm = $('#addForm').serializeArray();

    addForm.forEach(oneProp => {
      setItem({ ...item, [oneProp.name]: oneProp.value });
    });

    const _updateState = newItem =>
      setItemsList([...itemsList, newItem]);

    callAPI(`${ourAPI}/${context.modelName}`, 'POST', item, _updateState);
  };

  const deleteItem = id => {

    const _updateState = () => {
      setItemsList(itemsList.filter(item => item._id !== id));
    };

    callAPI(`${ourAPI}/${context.modelName}/${id}`, 'DELETE', undefined, _updateState);
  };

  const updateItem = e => {
    e.preventDefault();

    setShowField(!showField);
    setShowDetails(!showDetails);

    const updatedItem = $('#updateForm').serializeArray();

    updatedItem.forEach(oneProp => {
      setItem({ ...item, [oneProp.name]: oneProp.value });
    });

    const _updateState = newItem => setItemsList(itemsList.map(item => item._id === newItem._id ? newItem : item));

    callAPI(`${ourAPI}/${context.modelName}/${details._id}`, 'PUT', item, _updateState);
  };

  const handleUpdate = () => {
    setShowField(!showField);
  };

  const handleNewField = (fieldName) => {
    setFieldsNames([...fieldsNames, fieldName]);
  };

  const handleNewFieldUpdate = () => {
    $('#updateForm ul').append(`<li>${$('#newField').val()}: <input class='newInput' name=${$('#newField').val()} /></li>`);
    $('.newInput').on('change', handleInputChange);
  };

  const toggleDetails = id => {
    setShowDetails(!showDetails);
    setDetails(itemsList.filter(item => item._id === id)[0] || {});
  };

  return (
    <>
      <section className='zero-section-form'
        style={{
          backgroundImage: `url(${context.modelImg})`,
          height: '100%',
          position: 'fixed',
          width: '100%',
          zIndex: '-1',
        }}
      >
        <div></div>
      </section>


      <section className='second-section-form'>
        <div className='items'>
          <ul>
            {itemsList.map(item => (
              <li className="container-cards" key={item._id} >
                <div className="container-cards-surface container-cards-front">
                  <div className="container-cards-front-image">
                    <img src={item.img_url} alt="" />
                  </div>

                  <div className="container-cards-front-content">
                    <h2>{item.name}</h2>
                    <p>{item.des}</p>
                  </div>
                  <div className="container-cards-front-label">{context.modelName}</div>

                  <div className="container-cards-front-button">
                    <button className="flip-btn" onClick={() => toggleDetails(item._id)}>Details</button>
                    <ConfirmButton
                      dialog={['Delete', 'Sure?']}
                      action={() => deleteItem(item._id)}
                    />
                  </div>
                </div>
                <div className="container-cards-surface container-cards-back" style={{
                  backgroundImage: `url(${item.img_url})`,
                }}>
                  <div className="container-cards-back-content">
                    <h2>{item.name}</h2>
                  </div>
                </div>
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
                {Object.keys(details).map((property, idx) => {
                  if (idx > 1 && property !== '__v') {
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
                  {Object.keys(details).map((property, idx) => {
                    if (property !== '__v' && property !== '_id') {
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


      <section className='first-section-form'>
        <div className='model-form'>
          <form id='addForm' onSubmit={addItem}>

            {fieldsNames.map(oneField => (
              <div className="group">
                <input type="text" name={oneField} onChange={handleInputChange} required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{oneField}</label>
              </div>
            ))}

            <div className="group newField">
              <input id='newAddField' type="text" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>New Field</label>
            </div>
            <button className='newFieldButton' type='button' onClick={() => handleNewField($('#newAddField').val())}>add field</button>
            <button>Add</button>
          </form>
        </div>
        <div className='blank'>content</div>
      </section>
    </>
  );
}

export default Cool;