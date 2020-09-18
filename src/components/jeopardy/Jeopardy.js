import React, { Component } from 'react';
//import our service
import JeopardyService from "../../jeopardyService";
import Display from "../../components/display/Display"
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      catdata: [{clues:[]}, {clues: []}, {clues:[]}],
      score: 0,
      formData: { userAnswer: "" },
      currentCat: {},
      clickedClue: null
    }
    

  }

  componentDidMount() {
    this.getNewQuestion();
    this.getNewCat(Math.round(Math.random()*100));
    this.getNewCat(Math.round(Math.random()*100));
    this.getNewCat(Math.round(Math.random()*100));
    


  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })

  }
  getNewCat(id) {
    // console.log("testing")
    return this.client.getCat(id).then(result => {
      this.setState((prevstate) => {
        if (prevstate.catdata.length === 3) {
          prevstate.catdata = []
        }
        return { catdata: [...prevstate.catdata, result.data] }

      })

    })

  }
  handleCat = (buttonId) => {
    
    this.setState((prevstate) => {
      let randomClue =Math.round( Math.random()*prevstate.catdata[buttonId].clues.length)
      
      return { currentCat: prevstate.catdata[buttonId],randomClue: randomClue }


    })
    
  }
  handleQuestion = (clueObj, catId, clueId)=> {
    this.setState((prevstate) => {
     
      
      return { currentCat: prevstate.catdata[catId],clickedClue: clueId }


    })
  }



  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let currentClue = this.state.currentCat.clues[this.state.clickedClue]
    if (this.state.formData.userAnswer === currentClue.answer) {
      this.setState((prevstate) => {
        return { score: prevstate.score + currentClue.value }
      })

    }
    else {
      this.setState((prevstate) => {
        return { score: prevstate.score - currentClue.value }
      })

    }

    this.setState({
      submitted: true
    
    });
  }

  resetForm = (event) => {
    this.setState({
      currentCat: {},
      submitted: false,
      formData: {
        userAnswer: '',


      }
    });
    this.getNewQuestion()

  }

  //when the component mounts, get a the first question
  //display the results on the screen
  render() {



    return (
      <div>
        <Display info={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          resetForm={this.resetForm}
          handleCat={this.handleCat} 
          handleQuestion={this.handleQuestion}/>
      </div>
    );
  }
}
export default Jeopardy;


