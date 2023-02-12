import { FC } from 'react';

import './detailed.scss';

export const Detailed: FC = () => (
  <div className='detailed'>
    <h5 className='title'>Подробная информация</h5>
    <div className='content'>
      <div className='table'>
        <p className='subtitle_large'>Издательство</p>
        <p className='body_large'>Питер</p>
        <p className='subtitle_large'>Год издания</p>
        <p className='body_large'>2019</p>
        <p className='subtitle_large'>Страниц</p>
        <p className='body_large'>288</p>
        <p className='subtitle_large'>Переплёт</p>
        <p className='body_large'>Мягкая обложка</p>
        <p className='subtitle_large'>Формат</p>
        <p className='body_large'>70х100</p>
      </div>
      <div className='table'>
        <p className='subtitle_large'>Жанр</p>
        <p className='body_large'>Компьютерная литература</p>
        <p className='subtitle_large'>Вес</p>
        <p className='body_large'>370 г</p>
        <p className='subtitle_large'>ISBN</p>
        <p className='body_large'>978-5-4461-0923-4</p>
        <p className='subtitle_large'>Изготовитель</p>
        <p className='body_large'>ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29</p>
      </div>
    </div>
  </div>
);
