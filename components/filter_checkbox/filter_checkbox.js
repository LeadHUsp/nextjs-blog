import { useState } from 'react';

import style from './filter_checkbox.module.scss';

export default function FilterCheckBox({
  cat_id,
  name,
  isChecked,
  taxonomy_key,
  onChangeHandler,
}) {
  const [itemId, setItemId] = useState(cat_id);

  const onChangeHandlerFC = () => {
    onChangeHandler(itemId, isChecked, taxonomy_key);
  };

  return (
    <div className={style.filter_box}>
      <label className={style.lable}>
        <input
          type="checkbox"
          className={style.checkbox}
          onChange={onChangeHandlerFC}
          checked={isChecked}
        />
        <span className={style.checkmark}></span>
        {name}
      </label>
    </div>
  );
}
