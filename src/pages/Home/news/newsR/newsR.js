import classNames from 'classnames/bind';
import styles from './NewsR.module.scss';
const cx = classNames.bind(styles);
function NewsR(props) {
    const newss = [
        'pho-co-hoi-an_1680764131.jpg',
        '198008482_1680515641.jpg',
        '_dsf0367_2_1680858171.jpg',
        'anh-bia-2_1680682832.jpg',
    ];
    return (
        <div className={cx('inner-item')}>
            {newss.map((news, index) => (
                <div className={cx('inner-right')} key={index}>
                    <img src={require(`../../../../assets/images/${news}`)} alt="" />
                    <div>
                        <h5>TẬN HƯỞNG KỲ NGHỈ TẠI SÀI GÒN | ĐẶT PHÒNG KHÁCH SẠN TRỰC TUYẾN TẠI MƯỜNG THANH</h5>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default NewsR;
