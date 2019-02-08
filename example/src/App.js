import React, { Component, Fragment } from 'react';
import StackedImage from 'stackedimage-react';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Lazy loaded StackedImage component</h1>
        <div className="scroll">Scroll down</div>
        <div className="scroll">Keep scrolling...</div>
        <div className="scroll">Check the network tab in your dev tools, your image should load soon...</div>
        <StackedImage
          src="http://wietsedevries.eu/stackedimage/demo/StackedImage.png"
          lazy
        />
        <div className="caption">Now resize your browser width to see the component in action :)</div>
      </Fragment>
    )
  }
}
