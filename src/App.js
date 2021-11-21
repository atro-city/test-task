import './App.css';
import Spin from './Spin';
import Table from './Table'
import {useState} from 'react';

function App() {
  const [data, setData] = useState(localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):false);

  const getData = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
    console.log(data)
    setData(data);
  }

  const eraseData = () => {
    localStorage.removeItem('data');
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

