import { LoginActions } from '../components/LoginActions';
import { LoginHeader } from '../components/LoginHeader';
import { LoginSwiper } from '../components/LoginSwiper';

export const LoginPage = () => {
  return (
    <div className="cw_loginWrap Tut cw_introBG">
      <div className="cw_introbox">
        <div className="cw_webcontainer">
          <LoginHeader />
          <LoginSwiper />
          <LoginActions />
        </div>
      </div>
    </div>
  );
};
