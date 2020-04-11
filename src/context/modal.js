import React, { useState } from 'react';
export const ModelContext = React.createContext();

function ModelProvider(props) {

  const [modelName, setModelName] = useState('anime');
  const [modelDesc, setModelDesc] = useState('');
  const [modelImg, setModelImg] = useState('../components/images/null.jpg');
  const [uploadedFile, setUploadedFile] = useState({});

  const state = {
    modelName,
    modelDesc,
    modelImg,
    uploadedFile,
    changeModelName: setModelName,
    changeModelDesc: setModelDesc,
    changeModelImg: setModelImg,
    setUploadedFile: setUploadedFile,
  };

  return (
    <ModelContext.Provider value={state}>
      {props.children}
    </ModelContext.Provider>
  );
}

export default ModelProvider;