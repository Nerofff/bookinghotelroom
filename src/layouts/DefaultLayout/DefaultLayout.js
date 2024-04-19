import PropTypes from 'prop-types';
import Header from '~/layouts/DefaultLayout/Header';
import Footer from '~/layouts/DefaultLayout/Footer';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div>{children}</div>

            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
