import s from "./Pagination.module.scss";
import Link from "next/link";

export const Pagination = (props) => {
  let pages = [],
    totalPages = Number(props.totalPages),
    currentPage = Number(props.currentPage) || 1;

  if (currentPage > 1 && currentPage < totalPages) {
    pages = [currentPage - 1, currentPage, currentPage * 1 + 1];
  } else if (totalPages === 1 && currentPage === 1) {
    pages = [currentPage];
  } else if (currentPage === totalPages && totalPages > 2) {
    pages = [currentPage - 2, currentPage - 1, currentPage];
  } else if (currentPage === 1 && totalPages > 2) {
    pages = [currentPage, currentPage * 1 + 1, currentPage * 1 + 2];
  } else if (currentPage === totalPages && currentPage !== 1) {
    pages = [currentPage - 1, currentPage];
  } else if (totalPages <= 2) {
    pages = [currentPage, currentPage * 1 + 1];
  }

  return (
    <div className={s.pagination_container}>
      <ul>
        <li>
          <Link className={`${s.page_link} `} href={`/${props.slug}`}>
            <a>to start</a>
          </Link>
        </li>
        {pages.map((page) =>
          currentPage === page ? (
            <li key={page} className={`${s.active} ${s.skip}`}>
              <span>{page}</span>
            </li>
          ) : (
            <li key={page}>
              <Link href={`/${props.slug}/${page}`}>
                <a>{page} </a>
              </Link>
            </li>
          )
        )}
        <li>
          <Link
            className={`${s.page_link} `}
            href={`/${props.slug}/${totalPages}`}
          >
            <a>to end</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
