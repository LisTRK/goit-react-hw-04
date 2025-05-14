import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ imageGallery, onClickImage }) {
  const render = imageGallery.map((img) => {
    return (
      <li
        key={img.id}
        className={css.imageItem}
        onClick={() => onClickImage(img)}
      >
        <ImageCard card={img} />
      </li>
    );
  });
  return <ul className={css.imageList}>{render}</ul>;
}
