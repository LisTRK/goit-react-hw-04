import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from '../ImageModal/ImageModal';
import { MoonLoader } from 'react-spinners';
import { ErrorMessage } from '../ErrorMessage/ErrorMesage';
import Modal from 'react-modal';
import { fetchImages } from '../../api/fun-api';

Modal.setAppElement('#root');

function App() {
  const [imgData, setImgData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotelPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModalImage = (image) => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
    setModalData(image);
  };

  const closeModalImage = () => {
    document.body.style.overflow = 'visible';
    setIsModalOpen(false);
    setModalData({});
  };

  const submitForm = (newQuery) => {
    setPage(1);
    setTotelPages(1);
    setIsError(false);
    setQuery(newQuery);
    setImgData([]);
  };

  const onChange = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetchImages(query, page);

        setImgData((prevImgData) => [...prevImgData, ...response.results]);
        setTotelPages(response.total_pages);
      } catch (error) {
        console.log('error:', error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page, query]);

  return (
    <>
      <SearchBar onSubmit={submitForm} />

      {!isError ? (
        imgData.length > 0 && (
          <ImageGallery imageGallery={imgData} onClickImage={openModalImage} />
        )
      ) : (
        <ErrorMessage message={'Something went wrong...'} />
      )}

      {totalPages > page && <LoadMoreBtn onClick={onChange} />}

      {isLoading && (
        <MoonLoader
          cssOverride={{
            display: 'block',
            margin: '0 auto',
            borderColor: 'red',
          }}
        />
      )}
      {isModalOpen && (
        <ImageModal
          image={modalData}
          isClose={closeModalImage}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}

export default App;
