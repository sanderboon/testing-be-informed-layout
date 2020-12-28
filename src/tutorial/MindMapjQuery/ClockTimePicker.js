import React from 'react'
import jquery from "jquery"
window.$ = window.jQuery = jquery
require('jquery-clock-timepicker')

class Timepicker extends React.Component {
    componentDidMount() {
        jquery(".time").clockTimePicker()
    }


render() {
    return(
        <div>
            <input className='time' type='text' data-precision='5' data-minimum='10:00' data-maximum='20:00' />
        </div>
    )
}
}

export default Timepicker