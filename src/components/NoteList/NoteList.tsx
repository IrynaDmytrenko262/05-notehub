import css from "./NoteList.module.css";
import NoteItem from "./NoteItem";
import type { Note } from "../../types/note";

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
  deletingId: string | null;
}

function NoteList({ notes, onDelete, deletingId }: Props) {
  if (notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          isDeleting={deletingId === note.id}
        />
      ))}
    </ul>
  );
}

export default NoteList;