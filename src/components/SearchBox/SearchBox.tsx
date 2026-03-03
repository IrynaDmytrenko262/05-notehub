import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: Props) {
  return (
    <input
      type="text"
      className={css.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}

export default SearchBox;