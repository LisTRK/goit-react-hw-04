import css from './ErrorMessage.module.css';

export function ErrorMessage({ message }) {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>{message}</p>
    </div>
  );
}
