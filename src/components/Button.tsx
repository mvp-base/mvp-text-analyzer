import { Button as BSButton } from "react-bootstrap";

interface IButton {
    text: string;
}

export default function Button(props: IButton) {
    const { text } = props;

    return (    
        <BSButton>
            {text}
        </BSButton>
    );
} 