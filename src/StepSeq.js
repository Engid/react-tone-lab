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
      <a href="https://tonejs.github.io/docs/#Transport">Tone.Transport</a> 
      is the application-wide timekeeper. It's clock source enables sample-accurate scheduling as well as tempo-curves and automation. This example uses Tone.Sequence to invoke a callback every 16th note.
    </div>
  );
}

 export default class StepSeq extends Component {


  render(){
    return (
      <div>
        <div id="Title">Tone.Transport</div>
        <Explanation/>

      </div>
    )
  }
 }