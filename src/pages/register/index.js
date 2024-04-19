import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const cx = classNames.bind(styles);

function Signup() {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
            password: '',
            confirmedPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Không được để trống')
                .min(4, 'Phải có độ dài lớn hơn 4')
                .max(60, 'Phải có độ dài nhỏ hơn 60'),

            email: Yup.string()
                .required('Không được để trống')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng đinh dạng email ')
                .max(60, 'Phải có độ dài nhỏ hơn 60'),

            password: Yup.string()
                .required('Không được để trống')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt',
                )
                .max(60, 'Phải có độ dài nhỏ hơn 60'),

            confirmedPassword: Yup.string()
                .required('Không được để trống')
                .oneOf([Yup.ref('password'), null], 'Mật khẩu phải phù hợp với')
                .max(60, 'Phải có độ dài nhỏ hơn 60'),

            phone: Yup.string()
                .required('Không được để trống')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Phải là một số điện thoại hợp lệ')
                .max(15, 'Phải có độ dài nhỏ hơn 15'),
        }),

        onSubmit: (values) => {
            /* values.preventDefault(); */
            try {
                axios
                    .post('http://localhost:8080/api/v1/user/save', {
                        userName: values.name,
                        email: values.email,
                        phone: values.phone,
                        password: values.password,
                    })
                    .then(
                        (res) => {
                            if (res.data.message === 'Email exits') {
                                alert('Email này đã được dùng để đăng ký');
                            } else {
                                alert('Đã đăng ký thành công');
                            }
                        },
                        (fail) => {
                            console.error(fail);
                        },
                    );
                /* console.log(values.name, values.email, values.phone, values.password, values.confirmedPassword) */
                /*     alert('Đã đăng ký thành công'); */
            } catch (err) {
                alert(err);
            }
        },
    });

    return (
        <div className={cx('register-wapper')}>
            <div className={cx('img')}>
                <img src={images.login} alt="" />
            </div>
            <div className={cx('login-box')}>
                <h2>Đăng kí</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name && <p className={cx('errorMsg')}> {formik.errors.name} </p>}
                        <label>Họ Tên</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <label>Email</label>
                        {formik.errors.email && <p className={cx('errorMsg')}> {formik.errors.email} </p>}
                    </div>
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        <label>Phone Number</label>
                        {formik.errors.phone && <p className={cx('errorMsg')}> {formik.errors.phone} </p>}
                    </div>
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && <p className={cx('errorMsg')}> {formik.errors.password} </p>}
                        <label>Mật Khẩu</label>
                    </div>
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            id="confirmedPassword"
                            name="confirmedPassword"
                            value={formik.values.confirmedPassword}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.confirmedPassword && (
                            <p className={cx('errorMsg')}> {formik.errors.confirmedPassword} </p>
                        )}
                        <label>Xác Nhận Lại Mật Khẩu</label>
                    </div>
                    <div className={cx('button')}>
                        <div className={cx('lgsi')}>
                            {/* <Link to={config.routes.login}> */}
                            <button type="submit" className={cx('snip1582')}>
                                Đăng kí
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>

                    <div className={cx('button')}>
                        <div className={cx('lgsi')}>
                            <Link to={config.routes.login}>
                                <button className={cx('snip1582')}>Đã có tài khoản!</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Signup;
