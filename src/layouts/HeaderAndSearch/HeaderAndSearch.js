import PropTypes from 'prop-types';
import Header from '../DefaultLayout/Header/Header';
import Search from './Search/Search';
import classNames from 'classnames/bind';
import styles from './HeaderAndSearch.module.scss';
const cx = classNames.bind(styles);
function HeaderAndSearch({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Search />
            <div className={cx('Body')}>
                <div>{children}</div>
            </div>
        </div>
    );
}

HeaderAndSearch.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderAndSearch;
