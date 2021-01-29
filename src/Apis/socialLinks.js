import axios from 'axios';
export default {
    requestSocials(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/social_links/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/social_links`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/social_links/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/social_links`);
        }

    },
    getById(id){
        return axios.get(`${process.env.API_URL}/social_links/${id}`);
    }
}