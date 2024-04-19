import classNames from 'classnames/bind';
import styles from './NewsL.module.scss';
const cx = classNames.bind(styles);
function NewsL(props) {
    const newsHot = 'ben_thanh_market_2_1680856112.jpg';
    return (
        <div className={cx('inner')}>
            <img src={require(`../../../../assets/images/${newsHot}`)} alt="" draggable="false" />
            <div>
                <h5>TẬN HƯỞNG KỲ NGHỈ TẠI SÀI GÒN | ĐẶT PHÒNG KHÁCH SẠN TRỰC TUYẾN TẠI MƯỜNG THANH</h5>

                <h6>
                    Đặt phòng khách sạn tại Sài Gòn với Mường Thanh để có trải nghiệm nghỉ dưỡng tuyệt vời. Tận hưởng
                    các tiện ích đẳng cấp, phòng ấm cúng và không gian xanh mát tại Mường Thanh. Đặt phòng trực tuyến dễ
                    dàng và tiện lợi ngay hôm nay
                </h6>
            </div>
        </div>
    );
}
export default NewsL;
