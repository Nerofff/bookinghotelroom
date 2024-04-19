import Styles from '../AddRoom/AddRoom.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminService from '~/utils/AdminService';
import config from '~/config';

function EditHotel() {
    const [accountName, setAccountName] = useState('');

    const [provinceList, setProvinceList] = useState([]);
    const [id1, setid1] = useState('');
    const [hotelName, setHoteltName] = useState('');
    const [description, setDescription] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [images, setImages] = useState('');
    const [province, setProvince] = useState('');
    const navigate = useNavigate();

    const [msg, setMsg] = useState('');
    const [msghotelName, setMsghotelName] = useState('');
    const [msgdescription, setMsgdescription] = useState('');
    const [msgdescription1, setMsgsetDescription1] = useState('');
    const [msgdescription2, setMsgsetDescription2] = useState('');
    const [msgaddress, setMsgaddress] = useState('');
    const [msgemail, setMsgemail] = useState('');
    const [msgphone, setMsgphone] = useState('');
    const [msgimages, setMsgimages] = useState('');

    const { id } = useParams();
    useEffect(() => {
        AdminService.getAllProvince()
            .then((res) => {
                setProvinceList(res.data);
                /*  res.data.forEach((element) => {
                    setProvince((prevHotels) => element.name);
                }); */
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        setAccountName(userId.loginName);
        AdminService.getHotelById(id).then((res) => {
            console.log(res.data);
            setid1(res.data.id);
            setHoteltName(res.data.name);
            setAddress(res.data.address);
            setDescription(res.data.description);
            setDescription1(res.data.description1);
            setDescription2(res.data.description2);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setImages(res.data.img);
            setProvince(res.data.provinceName);
        });
    }, [id]);

    const HandleAddHotel = (e) => {
        e.preventDefault();

        let test = 0;
        if (hotelName.length === 0) {
            test = 1;
            setMsghotelName('Không được để trống');
        }
        if (address.length === 0) {
            test = 1;
            setMsgaddress('Không được để trống');
        }
        if (description.length === 0) {
            test = 1;
            setMsgdescription('Không được để trống');
        }
        if (email.length === 0) {
            test = 1;
            setMsgemail('Không được để trống');
        }
        if (images.length === 0) {
            test = 1;
            setMsgimages('Không được để trống');
        }
        if (phone.length === 0) {
            test = 1;
            setMsgphone('Không được để trống');
        }

        if (test === 0) {
            const editHotel = {
                id: id1,
                name: hotelName,
                address: address,
                description: description,
                description1: description1,
                description2: description2,
                email: email,
                img: images,
                phone: phone,
                provinceName: province,
            };

            AdminService.editHotel(editHotel)
                .then(
                    (res) => {
                        if (res.data.message === 'Hotel exits') {
                            setMsg('Khách Sạn Đã Tồn Tại');
                        } else if (res.data.message === 'Hotel not exits') {
                            setMsg('Khách Sản Đã Bị Xóa');
                        } else {
                            setMsg('Khách Sạn Đã Được Cập Nhập');
                            navigate(config.routes.HotelAdmin);
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
                            <div className="card-header fs-3 text-center">Cập Nhật Thông Tin Khách Sạn</div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}

                            <div className="card-body">
                                <form onSubmit={(e) => HandleAddHotel(e)}>
                                    <div className="mb-3">
                                        <label>Nhập Tên Khách Sạn</label>
                                        <input
                                            type="text"
                                            name="hotelName"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 255) {
                                                    setHoteltName(value);
                                                    setMsghotelName('');
                                                } else {
                                                    setMsghotelName('Phải có độ dài nhỏ hơn 255 ký tự');
                                                }
                                            }}
                                            value={hotelName}
                                        />
                                        {msghotelName && <p className="fs-4 text-center text-danger">{msghotelName}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label>Nhập Địa Chỉ</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 255) {
                                                    setAddress(value);
                                                    setMsgaddress('');
                                                } else {
                                                    setMsgaddress('Phải có độ dài nhỏ hơn 255 ký tự');
                                                }
                                            }}
                                            value={address}
                                        />
                                        {msgaddress && <p className="fs-4 text-center text-danger">{msgaddress}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label>Nhập Mô Tả 1</label>
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 2000) {
                                                    setDescription(value);
                                                    setMsgdescription('');
                                                } else {
                                                    setMsgdescription('Phải có độ dài nhỏ hơn 2000 ký tự');
                                                }
                                            }}
                                            value={description}
                                        />
                                        {msgdescription && (
                                            <p className="fs-4 text-center text-danger">{msgdescription}</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Mô Tả 2</label>
                                        <input
                                            type="text"
                                            name="description1"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 2000) {
                                                    setDescription1(value);
                                                    setMsgsetDescription1('');
                                                } else {
                                                    setMsgsetDescription1('Phải có độ dài nhỏ hơn 2000 ký tự');
                                                }
                                            }}
                                            value={description1}
                                        />
                                        {msgdescription1 && (
                                            <p className="fs-4 text-center text-danger">{msgdescription1}</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Mô Tả 3</label>
                                        <input
                                            type="text"
                                            name="description2"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 2000) {
                                                    setDescription2(value);
                                                    setMsgsetDescription2('');
                                                } else {
                                                    setMsgsetDescription2('Phải có độ dài nhỏ hơn 2000 ký tự');
                                                }
                                            }}
                                            value={description2}
                                        />
                                        {msgdescription2 && (
                                            <p className="fs-4 text-center text-danger">{msgdescription2}</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 255) {
                                                    setEmail(value);
                                                    setMsgemail('');
                                                } else {
                                                    setMsgemail('Phải có độ dài nhỏ hơn 255 ký tự');
                                                }
                                            }}
                                            value={email}
                                        />
                                        {msgemail && <p className="fs-4 text-center text-danger">{msgemail}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Số Điện Thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                const isPhoneValid = /^[\d\s]*$/.test(value);
                                                if (value === '' || (isPhoneValid && value.length < 45)) {
                                                    setPhone(value);
                                                    setMsgphone('');
                                                } else if (value.length >= 45) {
                                                    setMsgphone('Phải có độ dài nhỏ hơn 5 ký tự');
                                                } else {
                                                    setMsgphone('vui long nhập đúng định dạng');
                                                }
                                            }}
                                            value={phone}
                                        />
                                        {msgphone && <p className="fs-4 text-center text-danger">{msgphone}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label>Chọn Tỉnh Thành</label>
                                        <select
                                            value={province}
                                            name="province"
                                            onChange={(event) => {
                                                setProvince(event.target.value);
                                            }}
                                            className="form-control"
                                        >
                                            {provinceList.map((h, num) => {
                                                return (
                                                    <option value={h.name} key={num + 1}>
                                                        {h.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label>Nhập Ảnh</label>
                                        <input
                                            type="text"
                                            name="images"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 255) {
                                                    setImages(value);
                                                    setMsgimages('');
                                                } else {
                                                    setMsgimages('Phải có độ dài nhỏ hơn 255 ký tự');
                                                }
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

export default EditHotel;
