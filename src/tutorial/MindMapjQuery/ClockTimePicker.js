import React from 'react'

class Timepicker extends React.Component {
    componentDidMount() {
        $(".time").clockTimePicker()
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