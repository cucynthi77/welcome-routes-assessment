import React, { Component } from 'react';

const Display = (props) => {
    let element = ""
    if (props.info.submitted) {
        return (
            <div className="Jeopardy">
                <p>Correct Answer is {props.info.currentCat.clues[props.info.clickedClue].answer}, .
                        </p>
                <button onClick={props.resetForm}>Reset Form</button>
            </div>
        )
    }
    if (props.info.currentCat.clues !== undefined) {

        element = (
            <div>
                {/* Title: {props.info.currentCat.clues[0].category.title} */}
                <br />
      Question: {props.info.currentCat.clues[props.info.clickedClue].question}
                <br />
    Point Value: {props.info.currentCat.clues[props.info.clickedClue].value}
                <br />
                <br />
            </div>
        )
    }
    if (props.info.catdata[2] !== undefined) {
        return (
            <div className="something">
                Current Points: {props.info.score}
                {element}
                <button id="0" onClick={(event) =>
                    props.handleCat(event.target.id)}>
                    category: {props.info.catdata[0].title}
                </button>
                {props.info.catdata[0].clues && props.info.catdata[0].clues.map((clueobj, index) => {
                    if (index < 5) {
                                              
                        return <button key={clueobj.id} onClick={(clueobj) => props.handleQuestion(clueobj, 0, index)}>{clueobj.value}</button>

                        


                        

                    }

                })}
                <br />
                <button id="1" onClick={(event) =>
                    props.handleCat(event.target.id)}>
                    category: {props.info.catdata[1] && props.info.catdata[1].title}
                </button>
                {props.info.catdata[1].clues && props.info.catdata[1].clues.map((clueobj, index) => {

                    if (index < 5) {
                        return <button key={clueobj.id} onClick={(clueobj) => props.handleQuestion(clueobj, 1, index)}>{clueobj.value}</button>
                    }
                })}

                <button id="2" onClick={(event) => props.handleCat(event.target.id)}>category: {props.info.catdata[2] && props.info.catdata[2].title}</button>
                <br />
                {props.info.catdata[2].clues && props.info.catdata[2].clues.map((clueobj, index) => {
                    if(index < 5){
                        return <button key={clueobj.id} onClick={(clueobj) => props.handleQuestion(clueobj, 2, index)}>{clueobj.value}</button>
                    }
                })}



                <form onSubmit={props.handleSubmit} >

                    <label htmlFor="userAnswer">Who or what is</label>
                    <div>
                        <input
                            type="text"
                            name="userAnswer"
                            value={props.info.formData.userAnswer}
                            onChange={props.handleChange}
                        />

                    </div>

                    <button>Submit Form</button>
                </form></div>
        )

    }
    else {
        return "loading"
    }




}
export default Display;