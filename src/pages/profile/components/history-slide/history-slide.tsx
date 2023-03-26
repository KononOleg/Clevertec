import { FC } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperPagination } from '../../../../components/swiper-pagination';
import { IAccountComment, IBook } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './history-slide.scss';

interface IProps {
  books: IBook[];
  comments: IAccountComment[];
}

export const HistorySlide: FC<IProps> = ({ books, comments }) => {
  const searchComment = (id: string) => comments.find((comment) => comment.bookId === id);

  return (
    <div className='history-slide'>
      <Swiper
        pagination={SwiperPagination}
        modules={[Pagination]}
        breakpoints={{
          1300: {
            width: 1110,
            spaceBetween: 30,
            slidesPerView: 4,
          },

          786: {
            width: 640,
            spaceBetween: 35,
            slidesPerView: 3,
          },

          500: {
            width: 288,
            spaceBetween: 10,
            slidesPerView: 1,
          },
        }}
      >
        {books.map((book) => (
          <SwiperSlide key={book.id} data-test-id='history-slide'>
            <BookCard book={book} isTileView={true} isHistory={true} comment={searchComment(book.id)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
