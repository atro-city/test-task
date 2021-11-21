import logo from './static/logo.svg';
import upIcon from './static/up.png';
import downIcon from './static/down.png';
import {useState, useEffect} from 'react';
import Modal from './Modal';

export default function Spin (props) {
    const {data, eraseData} = props;

    const [characters, setCharacters] = useState(data);
    const [isModal, setIsModal] = useState(false);
    const [eyeSortOrder, setEyeSortOrder] = useState(0);
    const [yearSortOrder, setYearSortOrder] = useState(0);
    const [nameSortOrder, setNameSortOrder] = useState(0);
    const [genderSortOrder, setGenderSortOrder] = useState(0);
    const [heightSortOrder, setHeightSortOrder] = useState(0);
    const [draggedElement, setDraggedElement] = useState();
    const [page, setPage] = useState(1);

    useEffect(()=>{
        console.log('updating');
        localStorage.setItem('data', JSON.stringify(characters));
    },[characters])

    const handleClick = () =>{
        eraseData();
    }

    const deleteRow = (person) =>{
        setIsModal(person);
    }

    const confirmDelete = () =>{
        setCharacters(characters.filter(char => char !== isModal));
        setIsModal(false);
    }


    const hideModal = () =>{
        setIsModal(false);
    }

    const sortByEyeColor = () =>{
        setCharacters(characters.sort(function sort(ch1, ch2){
            if(ch1.eye_color > ch2.eye_color){
                if(eyeSortOrder===1) return 1
                else return -1;
            }
            if(ch1.eye_color < ch2.eye_color){
                if(eyeSortOrder===1) return -1
                else return 1;
            }
            return 0;
        }))
        if(eyeSortOrder === 1) setEyeSortOrder(-1)
        else setEyeSortOrder(1);
        setYearSortOrder(0);
        setGenderSortOrder(0);
        setHeightSortOrder(0);
        setNameSortOrder(0);
    }

    const sortByYear = () =>{
        setCharacters(characters.sort(function sort(ch1, ch2){
            if(ch1.birth_year > ch2.birth_year){
                if(yearSortOrder===1) return 1
                else return -1;
            }
            if(ch1.birth_year < ch2.birth_year){
                if(yearSortOrder===1) return -1
                else return 1;
            }
            return 0;
        }))
        if(yearSortOrder === 1) setYearSortOrder(-1)
        else setYearSortOrder(1)
        setGenderSortOrder(0);
        setHeightSortOrder(0);
        setNameSortOrder(0);
        setEyeSortOrder(0);
    }

    const sortByGender = () =>{
        setCharacters(characters.sort(function sort(ch1, ch2){
            if(ch1.gender > ch2.gender){
                if(genderSortOrder===1) return 1
                else return -1;
            }
            if(ch1.gender < ch2.gender){
                if(genderSortOrder===1) return -1
                else return 1;
            }
            return 0;
        }))
        if(genderSortOrder === 1) setGenderSortOrder(-1)
        else setGenderSortOrder(1)
        setYearSortOrder(0);
        setHeightSortOrder(0);
        setNameSortOrder(0);
        setEyeSortOrder(0);
    }

    const sortByHeight = () =>{
        setCharacters(characters.sort(function sort(ch1, ch2){
            if(ch1.height > ch2.height){
                if(heightSortOrder===1) return 1
                else return -1;
            }
            if(ch1.height < ch2.height){
                if(heightSortOrder===1) return -1
                else return 1;
            }
            return 0;
        }))
        if(heightSortOrder === 1) setHeightSortOrder(-1)
        else setHeightSortOrder(1)
        setYearSortOrder(0);
        setGenderSortOrder(0);
        setNameSortOrder(0);
        setEyeSortOrder(0);
    }

    const sortByName = () =>{
        setCharacters(characters.sort(function sort(ch1, ch2){
            if(ch1.name > ch2.name){
                if(nameSortOrder===1) return 1
                else return -1;
            }
            if(ch1.name < ch2.name){
                if(nameSortOrder===1) return -1
                else return 1;
            }
            return 0;
        }))
        if(nameSortOrder === 1) setNameSortOrder(-1)
        else setNameSortOrder(1)
        setYearSortOrder(0);
        setGenderSortOrder(0);
        setHeightSortOrder(0);
        setEyeSortOrder(0);
    }

    const handleDragOver = e =>{
        e.preventDefault();
    }

    const handleDragStart = person =>{
        setDraggedElement(person);
    }

    const handleDrop = person =>{
        let i1 = 0;
        let i2 = 0;
        characters.forEach((char, index) =>{
            if(char === person) i1 = index;
            if(char === draggedElement) i2 = index;
        })
        console.log(i1 + "   " + i2)
        const splice = characters;
        splice.splice(i2,1)
        splice.splice(i1,0,draggedElement)
        setCharacters([...splice]);
        console.log(characters)
    }

    const prevPage = () =>{
        setPage(page-1);
    }

    const nextPage = () =>{
        setPage(page+1)
    }

    return(
        <div>
            <Modal show={isModal} handleClose={hideModal}>
                <div className="modal">
                    Delete this character?
                    <br/>
                    <button className='cancel-button' onClick={hideModal}>Cancel</button>
                    <button className='confirm-button' onClick={confirmDelete}>Confirm</button>
                </div>
            </Modal>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <button className='header-button' onClick={sortByName}>Name</button>
                            {nameSortOrder===1&&<img src={upIcon} alt="up sort"/>}
                            {nameSortOrder===-1&&<img src={downIcon} alt="down sort"/>}
                        </th>
                        <th style={{"width":"145px"}}>
                            <button className='header-button' onClick={sortByYear}>Birth year</button>
                            {yearSortOrder===-1&&<img src={upIcon} alt="up sort"/>}
                            {yearSortOrder===1&&<img src={downIcon} alt="down sort"/>}
                        </th>
                        <th style={{"width":"109px"}}>
                            <button className='header-button' onClick={sortByGender}>Gender</button>
                            {genderSortOrder===-1&&<img src={upIcon} alt="up sort"/>}
                            {genderSortOrder===1&&<img src={downIcon} alt="down sort"/>}
                        </th>
                        <th style={{"width":"105px"}}>
                            <button className='header-button' onClick={sortByHeight}>Height</button>
                            {heightSortOrder===-1&&<img src={upIcon} alt="up sort"/>}
                            {heightSortOrder===1&&<img src={downIcon} alt="down sort"/>}
                        </th>
                        <th style={{"width":"134px"}}>
                            <button className='header-button' onClick={sortByEyeColor}>Eye color</button>
                            {eyeSortOrder===1&&<img src={upIcon} alt="up sort"/>}
                            {eyeSortOrder===-1&&<img src={downIcon} alt="down sort"/>}
                        </th>
                        <th></th>
                    </tr>
                    {characters.map((person, index) => {
                        let i1 = page*10-1;
                        let i2 = i1 - 10;
                        if(index <= i1 && index >=i2)
                            return(
                                <tr key={person.name} draggable="true" onDragStart={()=>handleDragStart(person)} onDragOver={handleDragOver} onDrop={()=>handleDrop(person)} >
                                    <td className="name">{person.name}</td>
                                    <td>{person.birth_year}</td>
                                    <td>{person.gender}</td>
                                    <td>{person.height}</td>
                                    <td>{person.eye_color}</td>
                                    <td><button id="delete" className="table-button" onClick={()=>deleteRow(person)}>delete</button></td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
            <br/>
            {page>1&&<button className='confirm-button' onClick={prevPage}>{'< previous page'}</button>}
            {!(characters.length <= page*10 && characters.length >= page*10-9) &&<button className='confirm-button' onClick={nextPage}>{'next page >'}</button>}
            <br/>
            <div>
                <button id="get-table" className="button" onClick={handleClick}>
                    <img src={logo} className="App-logo-small" alt="logo" />
                </button>
            </div>
            <p style={{"fontSize":"24px"}}>Tap the little spinny to erase data</p>
        </div>
    )
}
