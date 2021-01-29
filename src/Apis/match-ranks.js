import axios from 'axios';

export default{
        requestRankings(type, form) {
            if (type == 'put') {
                return axios.put(`${process.env.API_URL}/matches-rankings/${form.id}`, form);
            }
            else if (type == 'post') {
                return axios.post(`${process.env.API_URL}/matches-rankings`, form);
            } else if (type == 'delete') {
                return axios.delete(`${process.env.API_URL}/matches-rankings/${form.id}`);
            }
            else {
                return axios.get(`${process.env.API_URL}/matches-rankings`);
            }
        },
}