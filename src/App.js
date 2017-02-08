import React from 'react';
import './index.css';

class HistoryList extends React.Component {
  render() {
    return (
      <ol>
        {this.movesLinksList()}
      </ol>
    );
  }

  movesLinksList() {
    const moves = this.props.history.map((step, move) => {
      // move 0 is game start
      // move 1 is first step
      let moveCoordsText = step.addedMoveCoords;
      const desc = move ?
        'Move #' + move + moveCoordsText:
        'Game start';
      return (
        <li key={move}>
          <a href="#" className={this.isActive(move)} onClick={() => this.props.onClickCallback(move)}>{desc}</a>
        </li>
      );
    });
    return moves;
  }

  isActive(stepNumber) {
    return (this.props.stepNumber == stepNumber) ? 'active' : '';
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <button key={i} className="square" onClick={() => this.props.onClick(i)}>
        {this.props.squares[i]}
      </button>
    );
  }

  render() {
    const boardsNumbers = [[0,1,2], [3,4,5], [6,7,8]];
    
    const boardRows = boardsNumbers.map((boardRowNumbers, index) => {
      const rowSquares = boardRowNumbers.map((squareNumber) => {
        return(this.renderSquare(squareNumber));
      })
      return(
        <div key={index} className="board-row">
          {rowSquares}
        </div>
      )
    })
 
    return (
      <div>
        {boardRows}
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(){
    super();
    this.state = {
      history: [
        { squares: Array(9).fill(null), addedMoveCoords: null, }
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

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <HistoryList 
            stepNumber={this.state.stepNumber} 
            history={history} 
            onClickCallback={(stepNumber) => this.jumpTo(stepNumber)} />
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
    let moveCoordsText = this.calculateCoords(i);
    this.setState({
      history: history.concat([{
        squares: squares,
        addedMoveCoords: moveCoordsText,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  currentPlayerText() {
    return (this.state.xIsNext) ? 'X' : 'O';
  }

  calculateCoords(i) {
    let coordsY = parseInt(i / 3) + 1;
    let coordsX;

    if (i < 3) {
      coordsX = i + 1;
    }
    else if (i > 2 && i < 6) {
      coordsX = i - 2;
    } else {
      coordsX = i - 5;
    }
    return ('('+coordsY+',' + coordsX + ')')
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
