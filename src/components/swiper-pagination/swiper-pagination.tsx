import './swiper-pagination.scss';

export const SwiperPagination = {
  clickable: true,
  renderBullet(_: number, className: string) {
    return `<span class="${className}"></span>`;
  },
};
