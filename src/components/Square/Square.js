import classes from "./Square.module.css";

const Square = (props) => {
    return (
        <button data-testid="square" className={classes.square} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;