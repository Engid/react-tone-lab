import React, {Component} from 'react';
import Tone from 'tone';

/**
 * Rewrite of https://github.com/Tonejs/Tone.js/blob/master/examples/stepSequencer.html
 * using just React and ToneJS
 */

 export default class StepSeq extends Component {

  constructor(props){
    super(props);

    //NOTE: I'm swapping out the samples from the original demo to use a simple synth
    let synth = new Tone.Synth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
      }).toMaster();

    //the notes
    var noteNames = ["F#", "E", "C#", "A"];

      // Sequence set to 16 steps, each step an index number into the current column (or step). 
      // The `col` param would usually be a 'note', but its used here to lookup the note stored 
      // in a location that can be updated. When a Sequence is created, the Array of
      // events passed in are fixed to the new Sequence (although they may be able to be swapped
      // with new events). 
    var loop = new Tone.Sequence(function(time, col){
      var column = matrix1.matrix[col];
      for (var i = 0; i < 4; i++){
        if (column[i] === 1){
          //slightly randomized velocities
          var vel = Math.random() * 0.5 + 0.5;
          keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
        }
      }
    }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "16n");

    // If you'd rather not have to type out an array of values 0..N 
    // you could use this sexy one-liner:
    // [...Array(16).keys()]
    // Note that the awesome use of the spread operator can be attributed to this guru:
    // https://stackoverflow.com/a/36953272/4821960

    Tone.Transport.start();

  }


  render(){
    return (
      <div>
        <div id="Title">Tone.Transport</div>
        <Explanation/>

      </div>
    )
  }
 }

 const buildNewMatrix = (numRows, numCols, initValue = 0) => {
  let m = [];

  /**
   * Here we use the very terse but beautiful line
   * 
   * [...Array(numCols)].map( v => initValue )
   * 
   * to generate a new array at the length of numCols with
   * each value set to the initValue parameter.
   */

  for(let i = 0; i < numRows; ++i)
    m.push([...Array(numCols)].map( v => initValue ));
  
  return m;
}

const tableBuilder = (props) => {
  const {numRows, numCols, matrix} = props;

  //TODO: FINISH

}

function immutableUpdateMatrix(matrix, row, col, update) {
  /**
   * Given:
   *   var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
   * 
   * What is the immutable version of: 
   *   animals[2] = 'fish';
   * 
   *  Answer:
   *    var newAni = [...animals.slice(0, 2), 'fish', ...animals.slice(3)];
   *    console.log(newAni) // > Array ["ant", "bison", "fish", "duck", "elephant"]
   * 
   * 
   * For a 2D array (AKA matrix), updating row index 1, column 2 would be:
   * 
   * var animals = [
   *   ['ant', 'bison', 'camel', 'duck', 'elephant'],
   *   ['ant', 'bison', 'camel', 'duck', 'elephant'],
   *   ['ant', 'bison', 'camel', 'duck', 'elephant']
   *   ];
   *
   *  var newAnimals = [ 
   *    ...animals.slice(0,1),
   *    [...animals[1].slice(0,2), 'fish', ...animals[1].slice(3)],
   *    ...animals.slice(2)
   *  ];
   * 
   * 
   * creates a new array containing:
   * [
   *   ['ant', 'bison', 'camel', 'duck', 'elephant'],
   *   ['ant', 'bison', 'fish', 'duck', 'elephant'],
   *   ['ant', 'bison', 'camel', 'duck', 'elephant']
   * ];
   * 
  */

  //TODO: WRITE TESTS FOR THIS IN JEST
  return [
    ...matrix.slice(0, row),
    [...matrix[row].slice(0,col), update, ...matrix[row].slice(col+1)],
    ...matrix.slice(row+1)
  ];
}

const Explanation = () => {
  return (
    <div id="Explanation">
       <text>
          <a href="https://tonejs.github.io/docs/#Transport">Tone.Transport</a> 
          is the application-wide timekeeper. Its clock source enables sample-accurate 
          scheduling as well as tempo-curves and automation. This example uses Tone.Sequence 
          to invoke a callback every 16th note.
        </text>
    </div>
  );
}