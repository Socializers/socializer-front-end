import React, { useState } from 'react';
export const ModelContext = React.createContext();

function ModelProvider(props) {

  const [modelName, setModelName] = useState('anime');
  const [modelDesc, setModelDesc] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const state = {
    modelName,
    modelDesc,
    uploadedFile,
    changeModelName:setModelName,
    changeModelDesc:setModelDesc,
    setUploadedFile:setUploadedFile,
  };

  return(
    <ModelContext.Provider value={state}>
      {props.children}
    </ModelContext.Provider>
  );
}

export default ModelProvider;