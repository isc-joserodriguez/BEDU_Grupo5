import React from 'react'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { MdExpandMore } from 'react-icons/md';

import classes from './ToggleButton.module.css';

const ToggleButton = ({ eventKey, toggleShowCard, showed }) => {
    const toggler = useAccordionToggle(eventKey, () =>
        console.log('totally custom!'),
    );
    return (
        <MdExpandMore
            onClick={() => {
                toggleShowCard();
                toggler();
            }}
            className={showed ? classes.actionIconLess : classes.actionIconMore}
        />
    )
}

export default ToggleButton
