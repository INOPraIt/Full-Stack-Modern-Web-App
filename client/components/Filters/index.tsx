'use-client';

import React from 'react';
import './style.scss';

export default () => {
  return (
    <div className='filterContainer'>
      <p className='headerFilters'>Фильтры</p>
      <div className='inputsFilter'>
        <p className='namedFilter'>По наличию</p>
        <label className="labelCheckbox">
          <input type="checkbox" className='inputCheckbox'/>
          <div className='textCheckbox'>В наличии</div>
        </label>
        <label className="labelCheckbox">
          <input type="checkbox" className='inputCheckbox'/>
          <div className='textCheckbox'>Нет в наличии</div>
        </label>
        <label className="labelCheckbox">
          <input type="checkbox" className='inputCheckbox'/>
          <div className='textCheckbox'>На заказ</div>
        </label>
      </div>
      <div className='inputsFilter'>
        <p className='namedFilter'>По цене</p>
        
      </div>
    </div>
  )
}
