import { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa';
import { VscListFilter } from 'react-icons/vsc';
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
        <IconContext.Provider
          value={{
            /*  color: '#000', */ size: '20px',
          }}
        >
          <VscListFilter />
        </IconContext.Provider>
        {title}
        <div className={style.filter_item_icon}>
          <IconContext.Provider
            value={{
              /*  color: '#000', */ size: '15px',
            }}
          >
            <FaChevronDown />
          </IconContext.Provider>
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
