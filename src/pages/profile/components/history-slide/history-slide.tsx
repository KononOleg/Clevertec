import { FC } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperPagination } from '../../../../components/swiper-pagination';
import { IBook, IComment } from '../../../../types';
import { BookCard } from '../../../main/components/book-card';

import './history-slide.scss';

interface IProps {
  books: IBook[];
  comments: IComment[];
}

export const HistorySlide: FC<IProps> = ({ books, comments }) => {
  const searchComment = (id: string) => comments.find((comment) => comment.id === id);

  return (
    <div className='history-slide'>
      <Swiper spaceBetween={30} slidesPerView={4} pagination={SwiperPagination} modules={[Pagination]}>
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} isTileView={true} isHistory={true} comment={searchComment(book.id)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
