import axios from 'axios';

export default{
    sendRequests(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/requests/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/requests`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/requests/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/requests`);
        }
    },
    getRequestByType(type){
        return axios.get(`${process.env.API_URL}/request-by-type?type=${type}`);
    },
    getById(id){
        return axios.get(`${process.env.API_URL}/requests/${id}`);
    },
    purposeAll(form){
        return axios.post(`${process.env.API_URL}/requests/purposeAll`, form);
    },
    acceptPurposal(data){
        return axios.post(`${process.env.API_URL}/requests/accept-purposal`, data);
    },
    unacceptPurposal(data){
        return axios.post(`${process.env.API_URL}/requests/unaccept-purposal`, data);
    }, 
    getByRankCategory(type, rank_category){
        return axios.get(`${process.env.API_URL}/request-by-rank-category/${rank_category}?type=${type}`);
    }
};