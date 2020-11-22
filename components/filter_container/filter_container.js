import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import FilterCheckBox from '../../components/filter_checkbox/filter_checkbox';
import style from './filter_container.module.scss';

function FilterContainer({
  filter_items = [],
  onChangeHandler,
  title,
  taxonomy_key,
}) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`${style.filter_item} ${
        active ? style.filter_item_active : ''
      }`}
    >
      <div
        className={style.filter_item_title}
        onClick={() => setActive((prev) => !prev)}
      >
        {title}
        <div className={style.filter_item_icon}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className={style.filter_item_body}>
        <div className={style.filter_item_content}>
          {filter_items.map((item) => {
            return (
              <FilterCheckBox
                taxonomy_key={taxonomy_key}
                key={item.id}
                cat_id={item.id}
                name={item.name}
                isChecked={item.isChecked || false}
                onChangeHandler={onChangeHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default FilterContainer;
