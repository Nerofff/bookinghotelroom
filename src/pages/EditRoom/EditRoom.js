import Styles from '../AddRoom/AddRoom.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminService from '~/utils/AdminService';
import config from '~/config';

function EditRoom() {
    const [accountName, setAccountName] = useState('');
    const [hotelList, setHotelList] = useState([]);
    const [id1, setid1] = useState('');
    const [numberRoom, setNumberRoom] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [acreage, setAcreage] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState('');
    const [hotel, setHotel] = useState('');
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [msgProductName, setMsgProductName] = useState('');
    const [msgDescription, setMsgDescription] = useState('');
    const [msgacreage, setMsgacreage] = useState('');
    const [msgnumberRoom, setMsgnumberRoom] = useState('');
    const [msgprice, setMsgprice] = useState('');
    const [msgimages, setMsgimages] = useState('');
    const [test, settest] = useState('');

    const { id } = useParams();

    useEffect(() => {
        AdminService.getAllHotel()
            .then((res) => {
                setHotelList(res.data);
                /* res.data.forEach((element) => {
                    setHotel((prevHotels) => element.name);
                }); */
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        setAccountName(userId.loginName);
        AdminService.getRoomById(id)
            .then((res) => {
                setid1(res.data.id);
                setProductName(res.data.name);
                setDescription(res.data.description);
                setAcreage(res.data.acreage);
                setPrice(res.data.price);
                setImages(res.data.img);
                setHotel(res.data.hotelName);
                setNumberRoom(res.data.numberRoom);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    /* console.log(hotel); */
    /* console.log(hotelList); */
    const ProductRegsiter = (e) => {
        e.preventDefault();

        let test2 = 0;
        if (productName.length === 0) {
            test2 = 1;
            setMsgProductName('Không được để trống');
        }
        if (description.length === 0) {
            test2 = 1;
            setMsgDescription('Không được để trống');
        }
        if (acreage.length === 0) {
            test2 = 1;
            setMsgacreage('Không được để trống');
        }
        if (numberRoom.length === 0) {
            test2 = 1;
            setMsgnumberRoom('Không được để trống');
        }
        if (price.length === 0) {
            test2 = 1;
            setMsgprice('Không được để trống');
        }
        if (images.length === 0) {
            test2 = 1;
            setMsgimages('Không được để trống');
        }

        if (test === '' && test2 === 0) {
            const editRoom = {
                id: id1,
                name: productName,
                description: description,
                price: price,
                img: images,
                acreage: acreage,
                numberRoom: numberRoom,
                hotelName: hotel,
            };

            AdminService.editRoom(editRoom)
                .then(
                    (res) => {
                        if (res.data.message === 'Room exits') {
                            setMsg('Phòng Đã Tồn Tại');
                        } else if (res.data.message === 'Room not exits') {
                            setMsg('Phòng Đã Bị Xóa');
                        } else {
                            setMsg('Phòng Đã Được Cập Nhật');
                            navigate(config.routes.RoomAdmin);
                        }
                    },
                    (fail) => {
                        console.error(fail);
                    },
                )
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    let imageSrc = null;
    if (images) {
        try {
            imageSrc = require(`../../assets/images/${images}`);
        } catch (error) {}
    }
    return (
        <>
            <div>
                <div className={Styles.AreaHeader}>
                    <div className={Styles.user}>
                        <h1>{accountName}</h1>
                        <i className="fa-solid fa-building-user fa-flip-horizontal fa-2xl"></i>
                    </div>
                </div>
            </div>

            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Cập Nhật Thông Tin Phòng</div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}

                            <div className="card-body">
                                <form onSubmit={(e) => ProductRegsiter(e)}>
                                    <div className="mb-3">
                                        <label>Nhập Tên Phòng</label>
                                        <input
                                            type="text"
                                            name="productName"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value.length > 6) {
                                                    setMsgProductName('Phải có độ dài nhỏ hơn 60 ký tự');
                                                    settest(1);
                                                } else {
                                                    setMsgProductName('');
                                                    settest('');
                                                }
                                                setProductName(event.target.value);
                                            }}
                                            value={productName}
                                        />
                                        {msgProductName && (
                                            <p className="fs-4 text-center text-danger">{msgProductName}</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Mô Tả</label>
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value.length > 254) {
                                                    setMsgDescription('Phải có độ dài nhỏ hơn 255 ký tự');
                                                    settest(1);
                                                } else {
                                                    setMsgDescription('');
                                                    settest('');
                                                }

                                                setDescription(event.target.value);
                                            }}
                                            value={description}
                                        />
                                        {msgDescription && (
                                            <p className="fs-4 text-center text-danger">{msgDescription}</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Diện Tích</label>
                                        <input
                                            type="number"
                                            name="acreage"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value.length > 0) {
                                                    setMsgacreage('');
                                                }
                                                setAcreage(event.target.value);
                                            }}
                                            value={acreage}
                                        />
                                        {msgacreage && <p className="fs-4 text-center text-danger">{msgacreage}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Số Lượng</label>
                                        <input
                                            type="number"
                                            name="numberRoom"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value.length > 0) {
                                                    setMsgnumberRoom('');
                                                }
                                                setNumberRoom(event.target.value);
                                            }}
                                            value={numberRoom}
                                        />
                                        {msgnumberRoom && (
                                            <p className="fs-4 text-center text-danger">{msgnumberRoom}</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Chọn Khách Sạn</label>
                                        <select
                                            value={hotel}
                                            name="hotel"
                                            onChange={(event) => {
                                                setHotel(event.target.value);
                                            }}
                                            className="form-control"
                                        >
                                            {hotelList.map((h, num) => {
                                                return (
                                                    <option value={h.name} key={num + 1}>
                                                        {h.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Gía Cả</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value.length > 0) {
                                                    setMsgprice('');
                                                }
                                                setPrice(event.target.value);
                                            }}
                                            value={price}
                                        />
                                        {msgprice && <p className="fs-4 text-center text-danger">{msgprice}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Ảnh</label>
                                        <input
                                            type="text"
                                            name="images"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value.length > 254) {
                                                    setMsgimages('Phải có độ dài nhỏ hơn 255 ký tự');
                                                    settest(1);
                                                } else {
                                                    setMsgimages('');
                                                    settest('');
                                                }
                                                setImages(event.target.value);
                                            }}
                                            value={images}
                                        />
                                        {msgimages && <p className="fs-4 text-center text-danger">{msgimages}</p>}
                                        <img
                                            className={Styles.img}
                                            src={imageSrc}
                                            alt="Vui lòng nhập ảnh vào hoặc thêm ảnh vào thư mục assets/images nếu không thấy hiện ảnh"
                                        />
                                    </div>
                                    <button className="btn btn-primary col-md-12">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditRoom;
