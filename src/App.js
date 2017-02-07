import React from 'react';
import './index.css';


class Board extends React.Component {
  renderSquare(i) {
    return (
      <button className="square" onClick={() => this.props.onClick(i)}>
        {this.props.squares[i]}
      </button>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(){
    super();
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      // move 0 is game start
      // move 1 is first step
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  handleClick(i) { 
    const lastStep = this.state.history.length - 1;
    let history;
    if (lastStep > this.state.stepNumber) {
      history = this.state.history.slice(0, this.state.stepNumber + 1);
    } else {
      history = this.state.history;
    }
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] != null) {
      return;
    }
    if (calculateWinner(squares) != null) {
      return;
    }
    squares[i] = this.currentPlayerText();
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  currentPlayerText() {
    return (this.state.xIsNext) ? 'X' : 'O';
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
