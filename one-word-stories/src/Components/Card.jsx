

import './ComponentCSS/card.css';
import {Modal} from '../Components'
function Card(props){

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.text}</p>
                <Modal text={props.text}></Modal>
            </div>
        </div>
    );
}



export default Card;