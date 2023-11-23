import { useState } from "react";
import PropTypes from 'prop-types';

const Counter = ({ data, onChange }) => {
    const { type, text, minCount } = data;
    const [counter, setCounter] = useState(minCount);

    const handleClicked = (e) => {
        const value = e.target.value;
        setCounter((prevCounter) => {
            let updatedCounter;
            if (value === "less" && prevCounter !== minCount && prevCounter > 0) {
                updatedCounter = prevCounter - 1;
            } else if (value === "more") {
                updatedCounter = prevCounter + 1;
            } else {
                updatedCounter = prevCounter;
            }
            onChange(updatedCounter);
            return updatedCounter;
        });
    };

    return (
        <div className="counter">
            <div>
                <h3>{text}</h3>
                <p> {type === "adults" ? "De 13 o más" : "De 12 o menos"} </p>
            </div>
            <div className="counter-bttns">
                <button className="circle-bttn" onClick={handleClicked} value={"less"} name={type}>-</button>
                <p>{counter}</p>
                <button className="circle-bttn" onClick={handleClicked} value={"more"} name={type}>+</button>
            </div>
        </div>
    );
};

Counter.propTypes = {
    data: PropTypes.shape({
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        minCount: PropTypes.number.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

export default Counter;