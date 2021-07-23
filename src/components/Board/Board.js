import {useSelector} from "react-redux";
import Square from "../Square/Square";

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
        <div data-testid="board">
            <h2>Tic Tac Toe</h2>
            <div>{squares}</div>
        </div>
    );
}

export default Board;