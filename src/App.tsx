import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';
import { values } from './utils/values';
import { IVariable } from './utils/types';

function App() {
  const [variables, setVariables] = useState<IVariable[] | string[]>(['rain_sum', 'snowfall_sum']);

  const handleChangeVariables = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (values.includes(e.target.value)) {
      setVariables([...variables, e.target.value])
    }
  }

  return (
    <div className="main">
      <div>
        <label>
          <input
            type="text"
            onChange={handleChangeVariables}
          />
        </label>
      </div>
      <Weather lat={55.751244} long={37.618423} variables={variables} />
    </div>
  );
}

export default App;
