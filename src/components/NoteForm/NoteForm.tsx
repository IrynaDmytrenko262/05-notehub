import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { CreateNoteParams } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
  content: Yup.string(),
  tag: Yup.mixed<NoteTag>().required("Required"),
});

const initialValues: CreateNoteParams = {
  title: "",
  content: "",
  tag: "Work",
};

function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (values: CreateNoteParams) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <Field id="content" name="content" as="textarea" />
          <ErrorMessage name="content" component="div" />
        </div>

        <div>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          Create
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}

export default NoteForm;