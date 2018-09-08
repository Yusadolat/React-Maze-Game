import React, {
  Component
} from 'react';
import {
  shuffleArray
} from './shuffleArray';
import {
  movement
} from './Movement';
import {
  checkFinish
} from './checkFinish';
import {
  scoreCard
} from './scoreCard';
import Cell from './Cell';
import './App.css';

let createReactClass = require('create-react-class');
let mario_jump;
let items = [];
let max_mushroom;
let no_of_moves;

function WelcomeHeader() {
  return ( <
    div >
    <
    h2 > Maze game < /h2> <
    p > You need to eat all the green sprites on the board. < /p> <
    /div>
  )
}

let Score = createReactClass({
  getInitialState: function () {
    return {
      score: 0
    }

  },
  render: function () {
    return ( <
      div id = "score" >
      <
      div >
      <
      p > Score Achieved < /p> <
      p id = "score_achieved" > 0 < /p> <
      /div> <
      div >
      <
      p > Steps Used < /p> <
      p id = "no_of_moves" > 0 < /p> <
      /div> <
      div >
      <
      p > Remaining mushrooms < /p> <
      p id = "mashrooms_remaining" > 0 < /p> <
      /div> <
      /div>
    )
  }
})


let Box = createReactClass({
      getInitialState: function () {
        // build an array to hold all the cells
        //
        let c = [];
        let i;
        for (i = 1; i <= this.props.matrix; i++) {
          c.push( < Cell key = {
              i
            }
            id = {
              i
            }
            cells = {
              c
            }
            /> )
            items.push(i)
          }
          return {
            cells: c
          }
        },
        render: function () {
          return ( <
            div > {
              this.state.cells
            } < /div>
          )
        }
      })


    class App extends Component {
      constructor(props) {
        super(props);
        let width = prompt('Enter width of square');
        let height = prompt('Enter height of square')
        // This is to ensure the default behavior of the game.
        if (height === null || width === null || isNaN(width) === true || isNaN(height) === true) {
          height = 10
          width = 10
        }
        let matrixSize = height * width;
        mario_jump = width;
        this.state = {
          matrixSize: matrixSize,
          width: width,
          height: height
        }
      }

      componentDidMount() {
        window.addEventListener('load', this.handleLoad(this.state.width, this.state.height));
      }

      handleLoad(width, height) {
        let matrix = document.getElementById('root')
        matrix.style.height = 40 * height + "px"
        matrix.style.width = 40 * width + "px"
        console.log(items);
        let shuffled_data = shuffleArray(items)
        let truncated_data = shuffled_data.slice(0, Math.max(this.state.width, this.state.height))
        for (let i = 0; i < truncated_data.length; i++) {
          let elem_position = document.getElementById(truncated_data[i])
          elem_position.innerHTML = "<img src='mario-mashroom.jpeg' alt='mario' class='maze-image'/>";
          elem_position.classList.toggle('active')
        }

        let unique_data = shuffled_data.filter(function (obj) {
          return truncated_data.indexOf(obj) === -1;
        });
        let item = unique_data[Math.floor(Math.random() * unique_data.length)];
        let marioposition = document.getElementById(item)
        marioposition.classList.toggle('mario')
        marioposition.innerHTML = "<img src='mario-icon.png' alt='mario' class='maze-image'/>";
        max_mushroom = document.getElementsByClassName('active').length
        //console.log(max_mushroom);
      }

      onKeyPress(event) {
        if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
          if (no_of_moves === undefined) {
            no_of_moves = 0
          }
          no_of_moves = no_of_moves + 1;

        }
        movement(event, mario_jump, no_of_moves);
        checkFinish(no_of_moves);
        scoreCard(no_of_moves, max_mushroom);
      }

      componentWillMount() {
        document.addEventListener('keydown', this.onKeyPress);
      }

      render() {
        return ( <
          div className = "App" >
          <
          WelcomeHeader / >
          <
          Box matrix = {
            this.state.matrixSize
          }
          /> <
          Score / >
          <
          /div>
        );
      }
    }

    export default App;