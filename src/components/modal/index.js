/* eslint-disable no-unused-vars */

import React, { useContext } from 'react';

import styles from './modal.module.scss';
import { ModelContext } from '../../context/modal.js';
import styled from 'styled-components';

const Modal = props => {
  const context = useContext(ModelContext);
  return (
    <div className={styles.modal}>
      <div className='wow zoomIn'>
        <header
          style={{background:context.headerBackground}}
        >
          <span className="title">{props.title}</span>
          <button onClick={props.close}>X</button>
        </header>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
export default Modal;