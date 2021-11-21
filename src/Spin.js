import logo from './static/logo.svg';
import {useState, useEffect} from 'react';


export default function Spin (props) {
    const {getData} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [dots, setDots] = useState('.')

    
    useEffect(()=>{
        let timer;
        if(isLoading){
            timer = setTimeout(()=>{
                switch(dots){
                    case '.':
                        setDots('..');
                        break;
                    case '..':
                        setDots('...');
                        break;
                    case '...':
                        setDots('.');
                        break;
                    default:
                        break;
                }
            }, 500)
        }
        return function cleanup() {
            clearTimeout(timer);
          };
    },[dots, isLoading])

    const fetchData = async () =>{
        let array = []
        await fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(res => { console.log(res); array = res.results; console.log(array)})
        await fetch('https://swapi.dev/api/people/?page=2')
        .then(response => response.json())
        .then(res => { console.log(array); console.log(array.concat(res.results)); getData(array.concat(res.results))})
    }

    const handleClick = () =>{
        setIsLoading(true);
        setTimeout(fetchData, 1000)
        
    }

    return(
        <div>
            <button id="get-table" className="button" onClick={handleClick}>
                <img src={logo} className="App-logo" alt="logo" />
            </button>
            {isLoading?
            <p>Wait a moment{dots}</p>
            :
            <p>Tap the helmet to get some info</p>}
        </div>
    )
}
