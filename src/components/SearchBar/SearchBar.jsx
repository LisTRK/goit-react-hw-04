import { Formik, Form, Field } from 'formik';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const initialValues = {
    query: '',
  };
  const handelSubmit = ({ query }, helpers) => {
    onSubmit(query);
    helpers.resetForm();
  };
  return (
    <header className={styles.header}>
      <Formik initialValues={initialValues} onSubmit={handelSubmit}>
        <Form className={styles.form}>
          <Field
            className={styles.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
