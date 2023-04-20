import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ src, alt, handleClose }) => (
      <Overlay onClick={handleClose}>
        <ModalWindow>
          <img  src={src} alt={alt} width={800} height={500}/>
        </ModalWindow>
      </Overlay>
    );
    Modal.propTypes = {
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      handleClose: PropTypes.func.isRequired,
    };
  