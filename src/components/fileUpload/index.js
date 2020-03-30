/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import axios from 'axios';

import { ModelContext } from '../../context/modal.js';
import './fileUpload.scss';

const FileUpload = () => {
  const context = useContext(ModelContext);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3030/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;
      context.setUploadedFile({ fileName, filePath });

      console.log('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  
  return (
    <>
      <form className='uploader' onSubmit={onSubmit}>
        <input required type='file' onChange={onChange} />
        <input type='submit' value='Upload' />
      </form>
    </>
  );
};

export default FileUpload;