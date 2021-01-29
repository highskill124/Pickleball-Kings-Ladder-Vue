import axios from 'axios';
export default {
    requestMatches(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/matches/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/matches`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/matches/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/matches`);
        }
    },
    getByRankCategory(rank_category){
        return axios.get(`${process.env.API_URL}/request-matches-by-rank-category/${rank_category}`);
    },
    getById(id){
        return axios.get(`${process.env.API_URL}/matches/${id}`);
    },
    filterMatches(filters){
        return axios.post(`${process.env.API_URL}/filter-matches-by-rank-category`, filters);
    }
}