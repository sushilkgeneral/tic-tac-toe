import { useSelector, useDispatch } from "react-redux";
import Square from "../Square/Square";
import classes from "./Board.module.css";
import { actions } from "../../store/store";
import Button from "../Button/Button";
import { useEffect } from "react";

const Board = () => {
    const dispatch = useDispatch();
    const values = useSelector(state => state.values);
    const history = useSelector(state => state.history);
    const winner = useSelector(state => state.winner);

    useEffect(() => {
        dispatch(actions.calculateWinner(values));
    }, [dispatch, values]);

    const rewindHandler = () => {
        dispatch(actions.handleRewind());
    };

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
            <div className={classes.buttons}>
                <Button onClick={rewindHandler} text="Rewind"/>
                <Button onClick={resetHandler} text="Reset"/>
            </div>
            {winner && <p>{`${winner} wins!`}</p>}
            {!winner && history.length === 10 && <p>Its a tie</p>}
        </div>
    );
}

export default Board;