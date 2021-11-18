import logo from './logo.svg';

export default function Spin (props) {
    const {data, eraseData} = props;

    const handleClick = () =>{
        eraseData();
    }

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th style={{"width":"145px"}}>Birth year</th>
                        <th style={{"width":"109px"}}>Gender</th>
                        <th style={{"width":"105px"}}>Height</th>
                        <th style={{"width":"134px"}}>Eye color</th>
                    </tr>
                    {data.map(person => {
                        return(
                            <tr key={person.name}>
                                <td className="name">{person.name}</td>
                                <td>{person.birth_year}</td>
                                <td>{person.gender}</td>
                                <td>{person.height}</td>
                                <td>{person.eye_color}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br/>
            <div>
                <button id="get-table" className="button" onClick={handleClick}>
                    <img src={logo} className="App-logo-small" alt="logo" />
                </button>
            </div>
            <p style={{"fontSize":"24px"}}>Tap the little spinny to return</p>
        </div>
    )
}
