import PropTypes from 'prop-types';
import { ImageGalleryList, ImageGalleryItem, ImageGalleryItemImage } from './ImageGallery.styled';
export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL,largeImageURL, tags, }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          alt={tags}
          onClick={onImageClick}
          largeImageURL={largeImageURL}
          tags={tags}
        > <ImageGalleryItemImage src={webformatURL} alt={tags} name={largeImageURL}/></ImageGalleryItem>
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};

// export const ImageGallery = ({ images, onImageClick }) => {
//    return (
//    <ImageGalleryList>
//       {images.map((image, index) => (
//         <ImageGalleryItem onClick={onImageClick} image={image} key={index} />
//       ))}
//     </ImageGalleryList>
//     )
  
// };

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     })
//   ),
//   onImageClick: PropTypes.func.isRequired,
// };
