import Styles from './ConteinerShowRoom.module.scss';
import { useEffect, useState } from 'react';
/* import styled from 'styled-components'; */
import ShoppingCartService from '~/utils/ShoppingCartService';
import { format } from 'date-fns';
import HomeService from '~/utils/HomeService';
import { useParams } from 'react-router-dom';

function ShowRoom() {
    const start = new Date(localStorage.getItem('startDate'));

    const end = new Date(localStorage.getItem('endDate'));

    const [roomList, setRoomList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [hotel, sethotel] = useState('');
    const [tongTien, setTongTien] = useState('');
    const { id } = useParams();

    useEffect(() => {
        init(id);
        init1(id);
    }, [id]);

    const init = (id) => {
        HomeService.getHotelById(id)
            .then((res) => {
                sethotel(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const init1 = (id) => {
        HomeService.getAllRoomByHotelId(id)
            .then((res) => {
                setRoomList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        ShoppingCartService.getAllCartItem()
            .then((res) => {
                setCartList(res.data.viewCart);
                setTongTien(res.data.tongTien);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = (id1) => {
        ShoppingCartService.addCartItem(id1)
            .then(
                (res) => {
                    if (res.data.message === 'Add room success') {
                        init1(id);
                    } else if (res.data.message === 'Update room success') {
                        init1(id);
                    } else if (res.data.message === 'room is out') {
                        alert('Đã Hết Phòng');
                    } else {
                        alert('Phòng Không Tồn Tại');
                    }
                },
                (fail) => {
                    console.error(fail);
                },
            )
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClickDelete = (id2) => {
        ShoppingCartService.deleteCartItem(id2)
            .then(
                (res) => {
                    if (res.data === 'Update success') {
                        init1(id);
                    } else {
                        init1(id);
                        alert('Xóa Thành Công');
                    }
                },
                (fail) => {
                    console.error(fail);
                },
            )
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClickCreateBill = (e) => {
        e.preventDefault();
        const today = new Date();
        const userId = JSON.parse(localStorage.getItem('userId'));
        const ee = format(start, 'yyyy-MM-dd');
        console.log(userId.id);
        console.log(format(today, 'yyyy-MM-dd'));
        console.log(ee);
        if (cartList.length >= 0) {
            const bill = {
                ngayDat: format(today, 'yyyy-MM-dd'),
                ngayNhan: format(start, 'yyyy-MM-dd'),
                ngayTra: format(end, 'yyyy-MM-dd'),
                userId: userId.id,
            };
            console.log(bill);
            ShoppingCartService.CreateBill(bill)
                .then(
                    (res) => {
                        if (res.data === 'success') {
                            alert('success');
                            init1(id);
                        } else {
                            alert(res.data);
                            init1(id);
                            /* navigate(config.routes.HotelAdmin); */
                        }
                    },
                    /*  (fail) => {
                        console.error(fail);
                    }, */
                )
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert('Bạn chưa add phòng');
        }
    };

    const calculateDays = () => {
        const timeDiff = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return diffDays;
    };

    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    let imageSrc = null;
    if (hotel.img) {
        try {
            imageSrc = require(`../../assets/images/${hotel.img}`);
        } catch (error) {}
    }
    return (
        <>
            <div className={Styles.container}>
                <div>
                    <img src={imageSrc} alt="icon" />
                </div>
                <div className={Styles.title}>
                    <h2>{hotel.name}</h2>
                    <div>
                        <h3>
                            <i className="fa-solid fa-location-dot"></i>
                            {hotel.address}
                        </h3>
                    </div>
                    <div>
                        <h4>
                            <i className="fa-solid fa-phone"></i>
                            Điện thoại:(+84) {hotel.phone}
                        </h4>
                    </div>
                    <div className={`${Styles.note} ${showDetails ? Styles.show : ''}`}>
                        <p>{hotel.description}</p>
                        {showDetails && (
                            <p className={Styles.details}>
                                Với không gian thiết kế sang trọng, trang thiết bị hiện đại, tổ hợp dịch vụ đa dạng
                                (khách sạn kết hợp căn hộ), đội ngũ nhân viên chuyên nghiệp hứa hẹn sẽ mang lại cho Quý
                                khách hàng những trải nghiệm dịch vụ 5 sao xa hoa, tuyệt vời và khó quên.
                            </p>
                        )}
                        <div className={Styles.link} onClick={handleShowDetails}>
                            <span style={{ visibility: showDetails ? 'hidden' : 'visible' }}>
                                Xem chi tiết<i className="fa fa-angle-right"></i>
                            </span>
                            <span style={{ visibility: showDetails ? 'visible' : 'hidden' }}>
                                Thu gọn<i className="fa-solid fa-angle-right fa-rotate-180"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Styles.detailbar}>
                <h1>Vui lòng chọn phòng </h1>
            </div>
            <div className={Styles.bigcontainer}>
                <div className={Styles.smallcontainer}>
                    {roomList.map((room, index) => {
                        let imageSrc = null;
                        if (room.img) {
                            try {
                                imageSrc = require(`../../assets/images/${room.img}`);
                            } catch (error) {}
                        }
                        return (
                            <div key={index}>
                                <div className={Styles.smallcontainer1}>
                                    <div className={Styles.img}>
                                        <img src={imageSrc} alt="icon" />
                                    </div>
                                    <div className={Styles.Content}>
                                        <h1>{room.name}</h1>
                                        <div className={Styles.Room}>
                                            <h2>{room.description}</h2>

                                            <h3>
                                                <i className="fa-sharp fa-solid fa-table"></i>
                                                {room.acreage} m²
                                            </h3>
                                            <h3>Còn {room.numberRoom} phòng</h3>
                                        </div>
                                        <div className={Styles.convenient}>
                                            <i className="fa-sharp fa-solid fa-table"></i>
                                            <i className="fa-sharp fa-solid fa-table"></i>
                                            <i className="fa-sharp fa-solid fa-table"></i>
                                            {/* <h4>Xem tất cả tiện nghi</h4> */}
                                        </div>
                                        <h5>Giá chỉ từ</h5>
                                        <h6>
                                            {room.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}{' '}
                                            / đêm
                                        </h6>
                                    </div>
                                    <div className={Styles.B}>
                                        <span className={Styles.button} onClick={() => handleClick(room.id)}>
                                            <h4>Chọn phòng</h4>
                                        </span>
                                    </div>
                                </div>
                                {/*   <DropdownList isVisible={isVisibleMap[index]} className={Styles.Dropdownmenu}>
                                    <div className={Styles.Dropdownitem}></div>
                                </DropdownList> */}
                            </div>
                        );
                    })}
                </div>
                <div className={Styles.paymenttable}>
                    <div className={Styles.paymenttableinner}>
                        <div className={Styles.paymenttableTitle}>
                            <h1>Thông tin đặt phòng </h1>
                        </div>
                        <div className={Styles.paymenttabeName}>
                            <h2>Mường Thanh Luxury Hạ Long Centre</h2>
                            <h3>
                                {format(start, 'dd/MM/yyyy')} - {format(end, 'dd/MM/yyyy')} ({calculateDays()} đêm )
                            </h3>
                        </div>
                        <div className={Styles.paymenttableInfomation}>
                            <h4>Thông tin phòng</h4>
                        </div>

                        <div>
                            {cartList.map((cart, num) => {
                                return (
                                    <div className={Styles.paymenttableDetail} key={num + 1}>
                                        <h1>
                                            Phòng {num + 1}: {cart.name}
                                        </h1>
                                        <h1>{cart.description}</h1>
                                        <h3>Số lượng phòng : x{cart.quantity}</h3>
                                        <div className={Styles.pay}>
                                            {/*  <h5>1,974,000 VNĐ/Đêm</h5> */}
                                            <h5>
                                                {cart.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}{' '}
                                                / Đêm
                                            </h5>
                                            <span className={Styles.button3} onClick={() => handleClickDelete(cart.id)}>
                                                <h4>Hủy</h4>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={Styles.paymenttableBill}>
                            <h5>Tổng cộng</h5>
                            <h6>
                                {tongTien.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}{' '}
                            </h6>
                        </div>
                        <span className={Styles.button2} onClick={(e) => handleClickCreateBill(e)}>
                            <h4>Đặt ngay</h4>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowRoom;
/* const DropdownList = styled.div`
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;
 */
