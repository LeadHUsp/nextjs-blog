import Link from 'next/link';
import { useSelector } from 'react-redux';
import produce from 'immer';
import { mapValues } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

import s from './Pagination.module.scss';

export const Pagination = (props) => {
  const cleanUrlState = useSelector((state) => state.portfolio.url);
  let pushUrl = produce(cleanUrlState, (draftUrl) => {
    draftUrl = mapValues(draftUrl, function (value, key) {
      if (key === 'slug') {
        return value;
      } else if (key === 'page') {
        delete draftUrl[key];
      } else {
        let valueString = value.join('.');
        draftUrl[key] = valueString;
      }
    });
  });
  let pages = [],
    totalPages = Number(props.totalPages),
    currentPage = props.currentPage
      ? Number(props.currentPage.replace(/page_/, ''))
      : 1;

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
            <a>
              {' '}
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </a>
          </Link>
        </li>
        {pages.map((page) =>
          currentPage === page ? (
            <li key={page} className={`${s.active} ${s.skip}`}>
              <span>{page}</span>
            </li>
          ) : (
            <li key={page}>
              <Link
                href={{
                  pathname: '/[slug]/[page]',
                  query: {
                    page: `page_${page}`,
                    ...pushUrl,
                  },
                }}
              >
                <a>{page} </a>
              </Link>
            </li>
          )
        )}
        <li>
          <Link
            className={`${s.page_link} `}
            href={{
              pathname: '/[slug]/[page]',
              query: {
                slug: `${props.slug}`,
                page: `page_${totalPages}`,
              },
            }}
          >
            <a>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
