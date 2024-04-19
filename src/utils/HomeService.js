import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/home';

class HomeService {
    /*  saveProduct(Room) {
        return axios.post(API_URL + '/addRoom', Room);
    }
    getAllProvince() {
        return axios.get(API_URL + '/Province');
    }
    getAllProduct() {
        return axios.get(API_URL + '/');
    } */
    getAllHotelByProvinceId(id) {
        return axios.get(API_URL + '/' + id);
    }

    getAllRoomByHotelId(id) {
        return axios.get(API_URL + '/Room/' + id);
    }
    getHotelById(id) {
        return axios.get(API_URL + '/Hotel/' + id);
    }
    /*  getRoomById(id) {
        return axios.get(API_URL + '/' + id);
    }

    deleteRoom(id) {
        return axios.get(API_URL + '/deleteRoom/' + id);
    }

    editRoom(Room) {
        return axios.post(API_URL + '/editRoom', Room);
    } */
}

export default new HomeService();
