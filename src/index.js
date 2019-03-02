import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

class StackedImage extends PureComponent {
  constructor(props) {
    super(props);
    this.stacked = false;
    this.src = props.src.split('/StackedImage');
    if (this.src.length === 2) {
      this.stacked = true;
      this.root = this.src[0];
      this.ext = this.src[1];
    }

    // If image is lazy loaded, create state, ref and bind listener
    this.imgRef = undefined;
    if (props.lazy) {
      this.state = {
        ready: false,
      };
      this.imgRef = createRef();
      this.checkIntersection = this.checkIntersection.bind(this);
    }
  }

  componentDidMount() {
    if (this.props.lazy) {
      this.observer = new IntersectionObserver(this.checkIntersection, {
        rootMargin: this.props.offset && `${this.props.offset}px`,
      });
      this.observer.observe(this.imgRef.current);
    }
  }

  checkIntersection(entry) {
    if (entry[0].isIntersecting) {
      this.setState({ ready: true });
    }
  }

  render() {
    const { media, style, src, alt, lazy, className } = this.props;
    const { mobile, tablet, laptop } = media;
    if (lazy && !this.state.ready) {
      return <img ref={this.imgRef} className={className} style={style}/>;
    }
    return this.stacked ? (
      <picture>
        <source srcSet={`${this.root}/desktop.webp`} alt={alt} media={`(min-width: ${laptop}px)`}/>
        <source srcSet={`${this.root}/desktop${this.ext}`} alt={alt} media={`(min-width: ${laptop}px)`}/>
        <source srcSet={`${this.root}/laptop.webp`} alt={alt} media={`(min-width: ${tablet}px)`}/>
        <source srcSet={`${this.root}/laptop${this.ext}`} alt={alt} media={`(min-width: ${tablet}px)`}/>
        <source srcSet={`${this.root}/tablet.webp`} alt={alt} media={`(min-width: ${mobile}px)`}/>
        <source srcSet={`${this.root}/tablet${this.ext}`} alt={alt} media={`(min-width: ${mobile}px)`}/>
        <source srcSet={`${this.root}/mobile.webp`} alt={alt} media={`(max-width: ${mobile}px)`}/>
        <source srcSet={`${this.root}/mobile${this.ext}`} alt={alt} media={`(max-width: ${mobile}px)`}/>
        <img src={src} alt={alt} className={className} style={style} />
      </picture>
    ) : (
      <img src={src} alt={alt} className={className} style={style} />
    );
  }
}
StackedImage.defaultProps = {
  src: '[invalid src prop]',
  alt: '',
  media: {
    mobile: 768,
    tablet: 992,
    laptop: 1200,
  },
  lazy: false,
  offset: 300,
  style: {},
  className: '',
};
StackedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  media: PropTypes.object,
  lazy: PropTypes.bool,
  offset: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};
export default StackedImage;