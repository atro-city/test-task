import './App.css';
import Spin from './Spin';
import Table from './Table'
import {useState} from 'react';

function App() {
  const [data, setData] = useState(false);

  const getData = (data) => {
    setData(data);
  }

  const eraseData = () => {
    setData(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {!data&&<Spin getData={getData}/>}
        {data&&<Table data={data} eraseData={eraseData}/>}
      </header>
    </div>
  );
}

export default App;

