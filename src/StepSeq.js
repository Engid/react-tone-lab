import React, {Component} from 'react';
import Tone from 'tone';

/**
 * Rewrite of https://github.com/Tonejs/Tone.js/blob/master/examples/stepSequencer.html
 * using just React and ToneJS
 */

const buildMatrix = (numRows, numCols) => {
  let m = new Array(numRows);
  for(let i = 0; i < numRows; ++i)
    m.push(new Array(numCols));

  return m;
}

const tableBuilder = (props) => {
  const {numRows, numCols, matrix} = props;

  //TODO: FINISH

}

const Explanation = () => {
  return (
    <div id="Explanation">
       <text>
          <a href="https://tonejs.github.io/docs/#Transport">Tone.Transport</a> 
          is the application-wide timekeeper. It's clock source enables sample-accurate scheduling as well as tempo-curves and automation. This example uses Tone.Sequence to invoke a callback every 16th note.
        </text>
    </div>
  );
}

 export default class StepSeq extends Component {

  constructor(props){
    super(props);

    var keys = new Tone.Players({
    "A" : "./audio/casio/A1.[mp3|ogg]",
    "C#" : "./audio/casio/Cs2.[mp3|ogg]",
    "E" : "./audio/casio/E2.[mp3|ogg]",
    "F#" : "./audio/casio/Fs2.[mp3|ogg]",
    }, {
    "volume" : -10,
    "fadeOut" : "64n",
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

    // If you'd rather not have to type out an array of values 0..N you could use this
    // sexy one-liner:
    // [...Array(16).keys()]
    //Note the awesome use of the spread operator can be attributed to this guru:
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