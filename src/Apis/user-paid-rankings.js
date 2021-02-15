import axios from 'axios';
export default{
    requestPaidRankings(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/user-paid-rankings/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/user-paid-rankings`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/user-paid-rankings/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/user-paid-rankings`);
        }
    },
    getById(id){
        return axios.get(`${process.env.API_URL}/user-paid-rankings/${id}`);
    },
    getByUserId(id){
        return axios.get(`${process.env.API_URL}/user-paid-in-ladders/${id}`);
    }
}