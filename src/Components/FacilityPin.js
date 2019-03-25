// import React, { Component } from 'react'

// export default class FacilityPin extends Component {
//   render() {
//     const facilityPins = this.props.facilities.map((facility, index) => {
//       if (facility.latitude === null || facility.longtitude === null) {
//         return null
//       } else {
//         return <facilityPin onClick={() => this.setPinAsCenter(facility)} key={index} onChildMouseEnter={this.onChildMouseEnter} onChildMouseLeave={this.onChildMouseLeave} handlePinClick={this.handleOnClick} facilty={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude} />
//       }
//     })
//     return (

//       <div>
//         {this.facilityPins}
//       </div>
//     )
//   }
// }
