import config from '~/config';

import HeaderAndSearch from '~/layouts/HeaderAndSearch/HeaderAndSearch';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Country from '~/pages/countrys';
import Hotel from '~/pages/pageHotel';
import ListHotels from '~/pages/pageListHotels';
import Signup from '~/pages/register';
import SreachPage from '~/pages/SreachPage';
import ShowRoom from '~/pages/ShowRoom';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import RoomAdmin from '~/pages/PageRoomAdmin';
import AddRoom from '~/pages/AddRoom/AddRoom';
import EditRoom from '~/pages/EditRoom/EditRoom';

import HotelAdmin from '~/pages/PageHotelAdmin';
import AddHotel from '~/pages/AddHotel/AddHotel';
import EditHotel from '~/pages/EditHotel/EditHotel';

import ProvinceAdmin from '~/pages/PageProvinceAdmin';
import AddProvince from '~/pages/AddProvince/AddProvince';
import EditProvince from '~/pages/EditProvince/EditProvince';
import UserAdmin from '~/pages/PageUserAdmin';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.country, component: Country },
    { path: config.routes.pagelisthotel, component: ListHotels },
    { path: config.routes.pagehotel, component: Hotel },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Signup, layout: null },
    { path: config.routes.searchpage, component: SreachPage, layout: HeaderAndSearch },
    { path: config.routes.showroom, component: ShowRoom, layout: HeaderAndSearch },
];

const privateRoutes = [
    { path: config.routes.RoomAdmin, component: RoomAdmin, layout: AdminLayout },
    { path: config.routes.AddRoom, component: AddRoom, layout: AdminLayout },
    { path: config.routes.editRoom, component: EditRoom, layout: AdminLayout },

    { path: config.routes.HotelAdmin, component: HotelAdmin, layout: AdminLayout },
    { path: config.routes.AddHotel, component: AddHotel, layout: AdminLayout },
    { path: config.routes.editHotel, component: EditHotel, layout: AdminLayout },

    { path: config.routes.ProvinceAdmin, component: ProvinceAdmin, layout: AdminLayout },
    { path: config.routes.AddProvince, component: AddProvince, layout: AdminLayout },
    { path: config.routes.editProvince, component: EditProvince, layout: AdminLayout },

    { path: config.routes.UserAdmin, component: UserAdmin, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
