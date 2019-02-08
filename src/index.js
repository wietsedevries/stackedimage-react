import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

class StackedImage extends PureComponent {
  constructor(props) {
    super(props);
    const src = !!props.src ? props.src.split('/StackedImage') : '';
    this.stacked = false;
    this.lazy = props.lazy || false;
    if (src.length === 2) {
      this.stacked = true;
      this.root = src[0];
      this.ext = src[1];
    }
    this.imgRef = createRef();
    if (this.lazy) {
      this.state = {
        ready: false,
      };
      this.checkIntersection = this.checkIntersection.bind(this);
    }
  }

  componentDidMount() {
    if (this.lazy) {
      this.observer = new IntersectionObserver(this.checkIntersection, {
        rootMargin: this.props.offset ? `${this.props.offset}px` : '300px',
      });
      this.observer.observe(this.imgRef.current);
    }
  }

  checkIntersection(entry) {
    if (entry[0].isIntersecting) {
      console.log('Go');
      this.setState({ ready: true });
    }
  }

  render() {
    if (this.lazy && !this.state.ready) {
      return <span ref={this.imgRef} />;
    }
    const { media = {}, style = {} } = this.props;
    const { mobile = 768, tablet = 992, laptop = 1200 } = media;
    return this.stacked ? (
      <picture>
        <source srcSet={`${this.root}/desktop.webp`} alt={this.props.alt} media={`(min-width: ${laptop}px)`}/>
        <source srcSet={`${this.root}/desktop${this.ext}`} alt={this.props.alt} media={`(min-width: ${laptop}px)`}/>
        <source srcSet={`${this.root}/laptop.webp`} alt={this.props.alt} media={`(min-width: ${tablet}px)`}/>
        <source srcSet={`${this.root}/laptop${this.ext}`} alt={this.props.alt} media={`(min-width: ${tablet}px)`}/>
        <source srcSet={`${this.root}/tablet.webp`} alt={this.props.alt} media={`(min-width: ${mobile}px)`}/>
        <source srcSet={`${this.root}/tablet${this.ext}`} alt={this.props.alt} media={`(min-width: ${mobile}px)`}/>
        <source srcSet={`${this.root}/mobile.webp`} alt={this.props.alt} media={`(max-width: ${mobile}px)`}/>
        <source srcSet={`${this.root}/mobile${this.ext}`} alt={this.props.alt} media={`(max-width: ${mobile}px)`}/>
        <img src={this.props.src} alt={this.props.alt}
        />
      </picture>
    ) : (
      <img style={style} src={this.props.src} alt={this.props.alt}/>
    );
  }
}
StackedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  media: PropTypes.object,
  lazy: PropTypes.bool,
  offset: PropTypes.string,
  style: PropTypes.object,
};
export default StackedImage;