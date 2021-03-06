import React from 'react';
import Header from './Header'
import Main from './Main'

const App: React.FC = () => {
  return (
    <div className="app">
      <Header/>        
      <Main/>
    </div>
  );
}

export default App;
