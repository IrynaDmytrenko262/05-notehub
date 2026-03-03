import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

import type { CreateNoteParams } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

interface Props {
  onCreate: (data: CreateNoteParams) => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Title is required"),

  content: Yup.string()
    .max(500, "Maximum 500 characters")
    .required("Content is required"),

  tag: Yup.mixed<NoteTag>().required("Tag is required"),
});

function NoteForm({ onCreate }: Props) {
  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onCreate(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <Field
              name="title"
              placeholder="Title"
              className={css.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.fieldGroup}>
            <Field
              as="textarea"
              name="content"
              placeholder="Content"
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.fieldGroup}>
            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </Field>
            <ErrorMessage
              name="tag"
              component="div"
              className={css.error}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={css.button}
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;