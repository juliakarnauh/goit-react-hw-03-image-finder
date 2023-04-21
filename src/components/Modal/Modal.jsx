import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleClose();
    }
  };
  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.handleClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>
          <img src={src} alt={alt} width={800} height={500} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};