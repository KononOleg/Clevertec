import { FC, useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { API_HOST } from '../../../../constants';
import { IImage } from '../../../../types';

import './swiper.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface IProps {
  images: IImage[];
}

export const BookSwiper: FC<IProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const pagination = {
    clickable: true,
    renderBullet(_: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  return (
    <div className='swiper__wrapper'>
      <Swiper
        pagination={pagination}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Pagination, FreeMode, Navigation, Thumbs]}
        className='swiper_up'
        data-test-id='slide-big'
      >
        {images.map(({ url }) => (
          <SwiperSlide key={url} data-test-id='slide-mini'>
            <img src={`${API_HOST}${url}`} className='image' alt='book' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='swiper_down'
      >
        {images.map(({ url }) => (
          <SwiperSlide key={url}>
            <img src={`${API_HOST}${url}`} alt='book' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
