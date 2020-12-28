
import React, { Component } from 'react'
import $ from 'jquery'
// window.jQuery = $

// require('jquery-clock-timepicker')

// const jqueryClockTimepicker = require("jquery-clock-timepicker")

// import jqueryClockTimepicker from 'jquery-clock-timepicker'


class TestMindmap extends Component {


componentDidMount() {

    
   const testValue = $('.name').val()
   console.log(testValue)

    // $('.name').clockTimePicker({
    //     duration: true,
    //     durationNegative: true,
    //     precision: 5,
    //     i18n: {
    //         cancelButton: 'Abbrechen'
    //     },
    //     onAdjust: function(newVal, oldVal) {
    //         //...
    //     }
    // });
}


  render() { 
    return (
    <div>
      <header>
       <h1>TEST MINDMAP?!</h1>
       <input className='name' value='TEST VALUE'/>
      </header>
    </div>)
  }
}

export default TestMindmap;