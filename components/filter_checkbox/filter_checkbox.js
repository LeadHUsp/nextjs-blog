import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import {
  getPostData,
  setPostData,
  setSearchUrl,
} from '../../store/reducers/blogPageReducer';

import * as queryString from 'query-string';

import style from './filter_checkbox.module.scss';

export default function FilterCheckBox({ cat_id, name, isChecked }) {
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    setItemId(cat_id);
  }, []);

  const router = useRouter();
  const path = router.pathname;

  const pushParamToUrl = (e) => {
    history.pushState(history.state, history.state, `?category=${itemId}`);
    /* router.push({
      pathname: '/blog',
      query: { category: itemId },
    }); */
  };
  return (
    <div className={style.filter_box} onClick={pushParamToUrl}>
      <label>
        <input type="checkbox" defaultChecked={isChecked} />
        {name}
      </label>
    </div>
  );
}
