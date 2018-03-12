import React, {Component} from 'react';
import Tone from 'tone';


/**
*  This is a potential translation of the example from the Tone.js docs for synching animation 
*  with the a tone's triggering. Original from here:
*  https://github.com/Tonejs/Tone.js/blob/master/examples/animationSync.html
*
*  NOTE: I'm assuming you can figure out the relevant bits such as the index.html page, the 
*  compilation pipeline, and all that fun stuff. If not, just use the amazing create-react-app
*/


function NoteGroup(props) {
  let {pattern, currentNote} = props.s;
  return (
    <div id="Notes">
      {pattern.map((note)=> {
        //We don't need to use an ID to update the div, we can just compute whether it
        //is lit up or not via the props
        return <div className={(currentNote === note ? 'light' : '') + ' Note'}/>
      })}
    </div>
  )
}


export default class AniSync extends Component {

  state = {
    //Putting the pattern in the components state means we don't need
    //to hard-code what the notes are in the divs like the example.
    pattern: ["C4", "E4", "G4", "B4", "D5"],
    isOn: false,
    currentNote: null
  }

  constructor(props){
    super(props);

    let piano = new Tone.Synth({
			"oscillator" : {
				"type" : "fmsine4",
				"modulationType" : "square"
			}
		}).toMaster();
		this.loop = new Tone.Pattern((time, note)=>{
			piano.triggerAttackRelease(note, "16n", time);
			// Draw.schedule takes a callback and a time to invoke the callback
			Tone.Draw.schedule(()=>{
        //the callback synced to the animation frame at the given time
        
        // Original JQuery animation:
        // $("#"+note).css("opacity", 1).animate({"opacity" : 0}, 300);
        // This has been translated into CSS animations (see css file). 
        // Now all we need to do is set the state:
        this.setState({currentNote: note});

			}, time);
		}, this.state.pattern).start(0);
    
    this.loop.interval = "16n";
  }

  componentWillMount(){
    Tone.Transport.lookAhead = 0.5;
  }
  componentWillUnmount(){
    //Does Tone.js need to clean up anything?
  }

  render(){
    return (
      <div id="Content">
          <div id="Title">Synchronizing Visuals</div>
          <div id="Explanation">
            Audio scheduling and rendering visuals should always be kept separate. 
            Instead of triggering visuals from within a scheduled event callback, schedule a 'deferred' callback 
            using Tone.Draw which will be invoked on an animation frame at the exact moment of the scheduled event.
            <br/><br/>
            For more information see <a href="https://github.com/Tonejs/Tone.js/wiki/Performance">this wiki article</a>. 
          </div>

          <NoteGroup s={this.state}/>

          <button
            onClick={()=> {
              if(!this.state.isOn) {
                Tone.Transport.start("+0.1");
                this.setState({isOn: true});
              }
              else {
                Tone.Transport.stop();
                this.setState({isOn: false});
              }
            }}>
            {this.state.isOn ? 'Stop' : 'Start'}
          </button>
      </div>
    );
  }
}

