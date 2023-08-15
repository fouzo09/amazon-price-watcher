import axios from 'axios';
import { BASE_URL, HEADER } from '../global';

axios.interceptors.response.use(function(response){
    return response
}, function(error){
    throw new Error(error?.response?.data)
});

export default class ProductService{
    static async getProducts(){
        
        const response = await axios.get(`${BASE_URL}/products/list`);

        if(response.status === 200) return response.data;
    }

    static async addProduct(product){
        
        const response = await axios.post(`${BASE_URL}/products/create`, product, {
            headers: HEADER
          });

        if(response.status === 200) return response.data;
    }
}
