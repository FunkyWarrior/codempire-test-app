import React from 'react';

export default class ConfirmButton extends React.Component {
    render(){
        const {yes,no,text} = this.props;
        return(
            <>
                <div  className = "confirm" >
                    <h3 >{text}</h3>
                    <div className="confirm__buttons">
                        <button className = "confirm__buttons__yes" onClick={() => yes()}>Да</button>
                        <button className = "confirm__buttons__no" onClick={() => no()}>Нет</button>
                    </div>

                </div>
                <div className = "shadowBox"  onClick={no}/>
            </>
        )
    }
};
