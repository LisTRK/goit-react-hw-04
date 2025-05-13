import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({
  imageGallery,
  onClickImage,
  setIsModalOpen,
  setModalData,
}) {
  const render = imageGallery.map((img) => {
    return (
      <li
        key={img.id}
        className={css.imageItem}
        onClick={() => onClickImage(img, setIsModalOpen, setModalData)}
      >
        <ImageCard card={img} />
      </li>
    );
  });
  return <ul className={css.imageList}>{render}</ul>;
}
