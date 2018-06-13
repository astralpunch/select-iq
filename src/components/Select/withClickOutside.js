import React, { Component } from 'react';

export const withClickOutside = WrappedComponent =>
  class OutsideClickHandler extends Component {
    wrapperRef = React.createRef();
    componentRef = React.createRef();

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside, true);
      document.addEventListener('touchstart', this.handleClickOutside, true);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside, true);
      document.removeEventListener('touchstart', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.componentRef.current.clickOutsideHandler &&
          this.componentRef.current.clickOutsideHandler();
      }
    };

    render() {
      return (
        <div ref={this.wrapperRef}>
          <WrappedComponent ref={this.componentRef} {...this.props} />
        </div>
      );
    }
  };
