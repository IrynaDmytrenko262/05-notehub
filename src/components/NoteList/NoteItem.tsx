import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface Props {
  note: Note;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function NoteItem({ note, onDelete, isDeleting }: Props) {
  return (
    <li className={css.listItem}>
      <h3 className={css.title}>{note.title}</h3>

      <p className={css.content}>{note.content}</p>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>

        <button
          className={css.button}
          disabled={isDeleting}
          onClick={() => onDelete(note.id)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
}

export default NoteItem;