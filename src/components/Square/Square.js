const Square = (props) => {
    return (
        <button data-testid="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;