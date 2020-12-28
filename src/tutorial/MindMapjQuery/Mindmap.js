
import React, { Component } from 'react'
import $ from 'jquery'
// window.jQuery = $
require('jquery-clock-timepicker')

class MindmapComponent extends Component {
  componentDidMount() {
    $('.time').clockTimePicker({
      duration: true,
      durationNegative: true,
      precision: 5,
      i18n: {
        cancelButton: 'Abbrechen',
      },
      onAdjust:function(newVal,oldVal){
        //..
      },
    })
  }

  render() { 
    return (
    <div>
      <header>
       <input class='time' type='text' data-precision='5' data-minimum='10:00' data-maximum='20:00' />
      </header>
    </div>)
  }
}

export default MindmapComponent;