import { useSelector, useDispatch } from "react-redux";
import Square from "../Square/Square";
import classes from "./Board.module.css";
import { actions } from "../../store/store";
import Button from "../Button/Button";

const Board = () => {
    const dispatch = useDispatch();
    const values = useSelector(state => state.values);

    const resetHandler = () => {
        dispatch(actions.handleReset());
    };

    const squares = values.map((value, index) => {
        return (
            <Square
                key={index}
                value={value}
                onClick={() => dispatch(actions.handleClick(index))}
            />
        );
    });

    return (
        <div data-testid="board" className={classes.board}>
            <h2>Tic Tac Toe</h2>
            <div className={classes.squares}>{squares}</div>
            <Button onClick={()=>{}} text="Rewind"/>
            <Button onClick={resetHandler} text="Reset"/>
        </div>
    );
}

export default Board;