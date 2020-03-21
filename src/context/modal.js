import React, { useState } from 'react';
export const ModelContext = React.createContext();

function ModelProvider(props) {
  const [model, setModel] = useState('anime');
  const state = {
    model,
    changeModel:setModel,
  };
  return(
    <ModelContext.Provider value={state}>
      {props.children}
    </ModelContext.Provider>
  );
}

export default ModelProvider;