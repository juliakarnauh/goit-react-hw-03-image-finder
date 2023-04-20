import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../service/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppDiv } from './App.styled';
import { RotateLoader } from 'react-spinners';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import React from 'react';

let pageNr = 1;
export class App extends Component {
  state = {
    images: [],
    inputData: '',
    loading: false,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
    totalHits: 0,
  };

  handleSubmit = async inputData => {
    pageNr = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('The field is empty, try again.');
      return;
    } else {
      try {
        this.setState({ loading: true });
        const { totalHits, hits } = await getImages(inputData, pageNr);
        if (hits.length < 1) {
          Notiflix.Notify.failure(
            'Sorry, image not found, try again.'
          );
        } else {
          this.setState({
            images: hits,
            inputData,
            totalHits: totalHits,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  };
  handleClickMore = async () => {
    try {
      const { hits } = await getImages(this.state.inputData, (pageNr += 1));
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  async componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { totalHits, images, modalOpen, modalImg, modalAlt } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.loading && <RotateLoader />}

        <ImageGallery onImageClick={this.handleImageClick} images={images} />
        {totalHits > 12 && totalHits > images.length && (
          <Button onClick={this.handleClickMore} />
        )}
        {modalOpen ? (
          <Modal
            src={modalImg}
            alt={modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </AppDiv>
    );
  }
}
