import React from 'react';
import './EnableSwitch.css'
import { useState } from 'react';

export const EnableSwitch = ({ switchId, onEnableClick, backgroundColor }) => {
    const [isClicked, setIsClicked] = useState(true);

    function handleClick() {
        const enabled = isClicked === true ? false : true
        setIsClicked(enabled);
        onEnableClick(enabled);
    }

    return (
        <>
            <input
                checked={isClicked}
                onChange={() => handleClick()}
                className="react-switch-checkbox"
                id={switchId}
                type="checkbox"
            />
            <label
                style={{ backgroundColor: isClicked ? backgroundColor : "grey" }}
                className="react-switch-label"
                htmlFor={switchId}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};