export default function ({ onClick }) {
  const onChange = () => {
    onClick();
  };
  return (
    <button type="button" onClick={onChange}>
      Load more
    </button>
  );
}
