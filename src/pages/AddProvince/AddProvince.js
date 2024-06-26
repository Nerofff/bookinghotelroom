import { useEffect, useState } from 'react';
import Styles from '../AddRoom/AddRoom.module.scss';
import config from '~/config';
import AdminService from '~/utils/AdminService';
import { useNavigate } from 'react-router-dom';

function AddProvince() {
    const [accountName, setAccountName] = useState('');
    const [provinceName, setProvincetName] = useState('');
    const [images, setImages] = useState('');

    const navigate = useNavigate();

    const [msg, setMsg] = useState('');
    const [msgprovinceName, setMsgprovinceName] = useState('');
    const [msgimages, setMsgimages] = useState('');

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        setAccountName(userId.loginName);
    }, []);

    const HandleAddProvince = (e) => {
        e.preventDefault();

        let test = 0;
        if (provinceName.length === 0) {
            test = 1;
            setMsgprovinceName('Không được để trống');
        }
        if (images.length === 0) {
            test = 1;
            setMsgimages('Không được để trống');
        }

        if (test === 0) {
            const newProvince = {
                name: provinceName,
                img: images,
            };
            /* console.log(token); */
            AdminService.saveProvince(newProvince)
                .then(
                    (res) => {
                        if (res.data.message === 'Province exits') {
                            setMsg('Tỉnh Thành Đã Tồn tại');
                        } else {
                            setMsg('Tỉnh Đã Được Thêm Thành Công');
                            navigate(config.routes.ProvinceAdmin);
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
                            <div className="card-header fs-3 text-center">Thêm Tỉnh Thành</div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}

                            <div className="card-body">
                                <form onSubmit={(e) => HandleAddProvince(e)}>
                                    <div className="mb-3">
                                        <label>Nhập Tên Tỉnh </label>
                                        <input
                                            type="text"
                                            name="provinceName"
                                            className="form-control"
                                            onChange={(event) => {
                                                const value = event.target.value;

                                                if (value.length < 255) {
                                                    setProvincetName(value);
                                                    setMsgprovinceName('');
                                                } else {
                                                    setMsgprovinceName('Phải có độ dài nhỏ hơn 255 ký tự');
                                                }
                                            }}
                                            value={provinceName}
                                        />
                                        {msgprovinceName && (
                                            <p className="fs-4 text-center text-danger">{msgprovinceName}</p>
                                        )}
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

export default AddProvince;
