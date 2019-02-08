# stackedimage-react
![StackedImage](http://wietsedevries.eu/stackedimage/StackedImage.png)

React.js component to easily generate an optimized ```<picture/>``` element, using the StackedImage folder you created at [StackedImage.com](https://stackedimage.com)

[![NPM](https://img.shields.io/npm/v/stackedimage-react.svg)](https://www.npmjs.com/package/stackedimage-react) [![JavaScript Style Guide](https://img.shields.io/bundlephobia/minzip/stackedimage-react.svg)](https://www.npmjs.com/package/stackedimage-react)



## Install

```bash
npm install --save stackedimage-react
```

## Usage

The component expects the default StackedImage.png/jpeg file as its source and assumes all other images are present in the same folder. When you add any other image as the source, the component will fallback to a regular ```<img />``` element.

```jsx
import React, { Component } from 'react'

import stackedImage from 'stackedimage-react'

class Example extends Component {
  render () {
    return (
      <stackedImage src="../folder/StackedImage.png"/>
    )
  }
}
```

## Props

The StackedImage component accepts additional props for extra configuration, but keep in mind that it is a [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent), so it will only update when props with a primitive value are updated.

|Prop|Proptype|Default|Required|Description|
|----|--------|-------|--------|-----------|
|src|String|none|yes|Path to the default StackedImage file|
|alt|String|none|no|Alt-text for the image|
|media|object|```{ mobile: 768, tablet: 992, laptop: 1200 }```|no|Defines the max-width for viewport breakpoints|
|lazy|bool|```false```|no|Configure the StackedImage to be lazy-loaded|
|offset|number|```300```|no|Determines at what offset from the viewport (in pixels) the image should start to load (only when the prop ```lazy``` has been applied|
|style|object|none|no|Add your own styles|

### Full example
```jsx
import React, { Component } from 'react'

import stackedImage from 'stackedimage-react'

class Example extends Component {
  render () {
    return (
      <stackedImage
        src="../folder/StackedImage.png"
        alt="Example image"
        media={{
          mobile: 320,
          tablet: 900,
          laptop: 1100,
        }}
        lazy={true}
        offset={500}
        style={{
          width: '100%',
          height: '300px',
        }}
      />
    )
  }
}
```

## License

MIT © [wietsedevries](https://github.com/wietsedevries)
