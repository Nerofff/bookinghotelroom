import SideBar from './SideBar/SideBar';

import Styles from './AdminLayout.module.scss';

function AdminLayout({ children }) {
    return (
        <div className={Styles.BigArea}>
            <div className={Styles.SideBar}>
                <SideBar />
            </div>
            <div className={Styles.container}>{children}</div>
        </div>
    );
}

export default AdminLayout;
