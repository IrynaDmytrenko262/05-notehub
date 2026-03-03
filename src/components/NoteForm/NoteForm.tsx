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
  content: Yup.string(), // ✅ необов'язкове
  tag: Yup.string().required("Required"),
});

const initialValues: CreateNoteParams = {
  title: "",
  content: "",
  tag: "Work" as NoteTag,
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
          <label>Title</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label>Content</label>
          <Field name="content" as="textarea" />
          <ErrorMessage name="content" component="div" />
        </div>

        <div>
          <label>Tag</label>
          <Field name="tag" as="select">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
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