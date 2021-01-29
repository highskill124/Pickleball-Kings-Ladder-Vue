import axios from 'axios';
export default {
    requestSeasons(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/seasons/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/seasons`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/seasons/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/seasons`);
        }
    },
    getById(id){
        return axios.get(`${process.env.API_URL}/seasons/${id}`);
    }
}