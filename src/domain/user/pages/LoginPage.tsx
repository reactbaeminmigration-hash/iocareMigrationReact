import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/css/common.css';

export const LoginPage = () => {
  return (
    <div className="cw_loginWrap Tut cw_introBG">
      <div className="cw_introbox">
        <div className="cw_webcontainer">
          <div className="cw_header">
            <div className="cw_logo">
              <h1>IoCare</h1>
            </div>
          </div>
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
              <SwiperSlide>
                Coway IoCare는 IoT 기술을 활용, <br />
                고객의 일상을 관찰하고 분석·진단하는 <br />
                <strong>맞춤형 케어 솔루션</strong> 입니다.
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <strong>언제 어디서나</strong> <br />
                제품의 상태를 확인하고 편리하게 <br />
                원격 제어할 수 있습니다.
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <strong>최적의 제품 관리</strong>를 위하여
                <br />
                사용중인 제품의 월간 분석 리포트,
                <br />
                고장진단, 하트 서비스,
                <br />
                소모품 교체 주기 알림 서비스를 제공합니다.
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
          <div className="cw_login_btns">
            <div>
              <button type="button" className="cw_btn_login">
                <span>로그인</span>
              </button>
            </div>
            <div>
              <button type="button" className="cw_btn_tut">
                <span>IoCare 서비스 체험하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
