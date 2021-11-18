import logo from './logo.svg';
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
            }, 1000)
        }
        return function cleanup() {
            clearTimeout(timer);
          };
    },[dots, isLoading])

    const handleClick = () =>{
        setIsLoading(true);
        fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(res => { getData(res.results)})
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
