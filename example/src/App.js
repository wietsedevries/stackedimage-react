import React, { Component, Fragment } from 'react';
import StackedImage from 'stackedimage-react';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Lazy loaded StackedImage component</h1>
        <h2>Generated at <a href="https://stackedimage.com">StackedImage.com</a></h2>
        <div className="scroll">Scroll down</div>
        <div className="scroll">Keep scrolling...</div>
        <div className="scroll">Check the network tab in your dev tools, your image should load soon...</div>
        <StackedImage
          src="https://stackedimage.com/static/demo/StackedImage.png"
          lazy
        />
        <div className="caption">Now resize your browser width to see the StackedImage in action :)</div>
      </Fragment>
    );
  }
}
