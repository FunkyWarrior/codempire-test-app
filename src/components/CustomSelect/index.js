import React from "react";
import './style.css'

class CustomSelect extends React.Component {
    state = {
        showDrop : false
    };

    trigger = () => {
        this.setState({showDrop: !this.state.showDrop})
    };

    change = (e) => {
        this.trigger();
        this.props.onChange(e)
    };

    render() {
        const {options, id, value} = this.props;
        return (
            <div className='dropdown'>
                <div className="dropbtn" onClick={this.trigger}>{value}</div>
                <div className={this.state.showDrop ? "dropdown-content__show" : "dropdown-content__hidden"}>
                {options.map(el =>
                    <div key={el} id={id} onClick={this.change}>{el}</div>
                )}
                </div>
            </div>
        )
    }

}

export default CustomSelect