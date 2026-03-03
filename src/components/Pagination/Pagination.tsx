import css from "./Pagination.module.css";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ pageCount, currentPage, onPageChange }: Props) {
  if (pageCount <= 1) return null;

  return (
    <div className={css.pagination}>
      {Array.from({ length: pageCount }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={
              page === currentPage
                ? `${css.page} ${css.active}`
                : css.page
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;