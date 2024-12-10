import { Button as DefaultButton } from "react-bootstrap";
import styles from './Button.module.scss'

interface IButton {
    style: 'primary' | 'square' | 'round';
    text: string | JSX.Element;
    color?: 'red' | 'blue' | 'cyan' | 'yellow' | 'green' | 'gray' | 'white';
}

const colors = {
    red: {
        background: '#f93850',
        text: '#ffffff'
    },
    green: {
        background: '#2ab88d',
        text: '#000000'
    },
    blue: {
        background: '#5c60de',
        text: '#ffffff'
    },
    cyan: {
        background: '#2fbbb4',
        text: '#000000'
    },
    yellow: {
        background: '#fbc50a',
        text: '#222222'
    },
    gray: {
        background: '#888888',
        text: '#ffffff'
    },
    white: {
        background: '#c0c0fa',
        text: '#222222'
    }
};

const defaultColors = {
    primary: colors.blue,
    square: colors.gray,
    round: colors.red,
}

export default function Button(props: IButton) {
    const { text, style, color } = props;

    if (style === 'primary') {
        const backgroundColor = color ? colors[color].background : colors.blue.background;
        const textColor = color ? colors[color].text : colors.blue.text;
        const borderColor = backgroundColor;

        return (
            <DefaultButton className={styles.primaryButton} style={{ backgroundColor: backgroundColor, borderColor: borderColor, color: textColor }}>
                {text}
            </DefaultButton>
        );
    }

    if (style === 'square') {
        const backgroundColor = 'transparent';
        const borderColor = color ? colors[color].background : colors.blue.background;
        const textColor = borderColor;

        return (
            <DefaultButton className={styles.squareButton} style={{ backgroundColor: backgroundColor, borderColor: borderColor, color: textColor }}>
                {text}
            </DefaultButton>
        );
    }

    if (style === 'round') {
        const backgroundColor = color ? colors[color].background : colors.blue.background;
        const textColor = color ? colors[color].text : colors.blue.text;
        const borderColor = backgroundColor;

        return (
            <DefaultButton className={styles.roundButton} style={{ backgroundColor: backgroundColor, borderColor: borderColor, color: textColor }}>
                {text}
            </DefaultButton>
        );
    }
} 