import { useState, useEffect } from 'react';
import './App.css';
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
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotelPages] = useState();
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

  const submitForm = async (newQuery) => {
    const str = newQuery.trim();
    try {
      setPage(1);
      if (str === '') {
        return;
      }
      setTotelPages(0);
      setIsError(false);
      setIsLoading(true);
      setQuery(newQuery);
      setImgData([]);
      const response = await fetchImages(newQuery, page);
      setImgData(response.results);
      setTotelPages(response.total_pages);
    } catch (error) {
      console.log('error:', error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const onChange = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (imgData.length === 0) return;
    async function fetchData() {
      try {
        const response = await fetchImages(query, page);

        setImgData((prevImgData) => [...prevImgData, ...response.results]);
      } catch (error) {
        console.log('error:', error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return (
    <>
      <SearchBar onSubmit={submitForm} />
      {query.trim() === '' && page === 1 && <p>Please, input your query</p>}

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
