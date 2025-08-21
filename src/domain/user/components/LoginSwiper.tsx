import { t } from 'i18next';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const LoginSwiper = () => {
  return (
    <div className="cw_tut_swipe">
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        speed={400}
        pagination={{
          clickable: true,
          el: '.cw_paging',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index, className) =>
            `<span class="${className}">${index + 1}</span>`,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="swiper-container"
      >
        <SwiperSlide className="swiper-slide">
          <div dangerouslySetInnerHTML={{ __html: t('CON.SWIPER_SIDE1') }} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div dangerouslySetInnerHTML={{ __html: t('CON.SWIPER_SIDE2') }} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div dangerouslySetInnerHTML={{ __html: t('CON.SWIPER_SIDE3') }} />
        </SwiperSlide>

        <div className="cw_paging swiper-pagination"></div>

        <div className="swiper-button-prev">
          <button type="button" className="cw_btn_prev">
            <span>Previous</span>
          </button>
        </div>
        <div className="swiper-button-next">
          <button type="button" className="cw_btn_next">
            <span>Next</span>
          </button>
        </div>
      </Swiper>
    </div>
  );
};
