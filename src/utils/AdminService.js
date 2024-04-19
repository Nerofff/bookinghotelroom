import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/admin';

let token = null;
if (localStorage.getItem('Token') != null) {
    token = localStorage.getItem('Token').slice(1, -1);
}

class AdminService {
    /*  getConfig(token) {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        return config;
    } */

    constructor() {
        this.config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
    }
    saveProduct(Room) {
        return axios.post(API_URL + '/addRoom', Room, this.config);
    }

    saveHotel(Hotel) {
        return axios.post(API_URL + '/addHotel', Hotel, this.config);
    }

    saveProvince(Province) {
        return axios.post(API_URL + '/addProvince', Province, this.config);
    }

    getAllProvince() {
        return axios.get(API_URL + '/Province');
    }
    getAllProduct() {
        return axios.get(API_URL + '/Room');
    }
    getAllHotel() {
        return axios.get(API_URL + '/Hotel');
    }

    getAllUser() {
        return axios.get(API_URL + '/User', this.config);
    }
    getAllRole() {
        return axios.get(API_URL + '/Role', this.config);
    }

    getSearchRoom(search) {
        return axios.get(API_URL + '/Room/Search', {
            params: {
                name: search,
            },
        });
    }

    getSearchHotel(search) {
        return axios.get(API_URL + '/Hotel/Search', {
            params: {
                name: search,
            },
        });
    }

    getSearchUser(search) {
        return axios.get(API_URL + '/User/Search', {
            params: {
                name: search,
            },
        });
    }

    getRoomById(id) {
        return axios.get(API_URL + '/RoomEdit/' + id);
    }

    getHotelById(id) {
        return axios.get(API_URL + '/HotelEdit/' + id);
    }

    getProvinceById(id) {
        return axios.get(API_URL + '/ProvinceEdit/' + id);
    }

    deleteRoom(id) {
        return axios.get(API_URL + '/deleteRoom/' + id, this.config);
    }

    deleteHotel(id) {
        return axios.get(API_URL + '/deleteHotel/' + id, this.config);
    }

    deleteProvince(id) {
        return axios.get(API_URL + '/deleteProvince/' + id, this.config);
    }

    editRoom(Room) {
        return axios.post(API_URL + '/editRoom', Room, this.config);
    }

    editHotel(Hotel) {
        return axios.post(API_URL + '/editHotel', Hotel, this.config);
    }

    editProvince(Province) {
        return axios.post(API_URL + '/editProvince', Province, this.config);
    }

    editRoleUser(user) {
        return axios.post(API_URL + '/editRoleUser', user, this.config);
    }
}

export default new AdminService();
