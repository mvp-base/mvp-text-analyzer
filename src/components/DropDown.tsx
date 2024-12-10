import { Dropdown as DefaultDropdown } from 'react-bootstrap'; // Correct import
import Button from './Button'; // Your custom Button component

import styles from './DropDown.module.scss';

interface IDropDown {
    color?: 'red' | 'gray' | 'blue' | 'cyan' | 'yellow' | 'gray' | 'white';
}

const colors = {
    red: '#f93850',
    green: '#2ab88d',
    blue: '#5c60de',
    cyan: '#2fbbb4',
    yellow: '#fbc50a',
    gray: '#888888',
    white: '#c0c0fa',
};

export function DropDown(props: IDropDown) {
    const { color } = props;

    const textColor = color ? colors[color] : colors.blue;

    return (
        <DefaultDropdown>
            <DefaultDropdown.Toggle
                style={{ backgroundColor: 'transparent', borderColor: textColor, color: textColor }}
                className={styles.dropDownButton}
                id="dropdown-basic"
            >
                <i className="bi bi-caret-down-fill"></i>
            </DefaultDropdown.Toggle>

            <DefaultDropdown.Menu>

            </DefaultDropdown.Menu>
        </DefaultDropdown>
    );
}