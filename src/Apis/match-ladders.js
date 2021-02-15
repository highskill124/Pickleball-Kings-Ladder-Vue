import axios from 'axios';

export default{
    requestLadders(type, form) {
        if (type == 'put') {
            return axios.put(`${process.env.API_URL}/matches-ladder/${form.id}`, form);
        }
        else if (type == 'post') {
            return axios.post(`${process.env.API_URL}/matches-ladder`, form);
        } else if (type == 'delete') {
            return axios.delete(`${process.env.API_URL}/matches-ladder/${form.id}`);
        }
        else {
            return axios.get(`${process.env.API_URL}/matches-ladder`);
        }
    },
    getById(id){
        return axios.get(`${process.env.API_URL}/matches-ladder/${id}`);
    },
    getBySeason(id){
        return axios.get(`${process.env.API_URL}/matches-ladder-by-season/${id}`);
    },
    getUserRankingsByLadder(id, filter=null,page=1){
        if(filter){
            return axios.post(`${process.env.API_URL}/matches-ladder-user-ranking/${id}`, filter);
        } else{
            return axios.get(`${process.env.API_URL}/matches-ladder-user-ranking/${id}?page=${page}`);
        }
    }
}