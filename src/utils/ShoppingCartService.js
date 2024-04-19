import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ShoppingCart';

class ShoppingCartService {
    addCartItem(id) {
        return axios.get(API_URL + '/addCartItem/' + id);
    }

    getAllCartItem() {
        return axios.get(API_URL + '/view');
    }

    deleteCartItem(id) {
        return axios.get(API_URL + '/deleteCartItem/' + id);
    }

    clearCart(sodem) {
        return axios.get(API_URL + '/clearCartItem/' + sodem);
    }
    CreateBill(bill) {
        return axios.post(API_URL + '/CreateBill', bill);
    }
}

export default new ShoppingCartService();
