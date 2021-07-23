import { useSelector } from "react-redux";
import Square from "../Square/Square";
import classes from "./Board.module.css";

const Board = () => {
    const values = useSelector(state => state.values);

    const squares = values.map((value, index) => {
        return (
            <Square
                key={index}
                value={value}
                onClick={() => {}}
            />
        );
    });

    return (
        <div data-testid="board" className={classes.board}>
            <h2>Tic Tac Toe</h2>
            <div className={classes.squares}>{squares}</div>
        </div>
    );
}

export default Board;