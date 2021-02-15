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
    getByLadder(id, req_type, filters){
        if(req_type=="get"){
            return axios.get(`${process.env.API_URL}/request-matches-by-ladder/${id}`);
        } else{
            return axios.post(`${process.env.API_URL}/request-matches-by-ladder/${id}`, filters);
        }
       
    },
    getById(id){
        return axios.get(`${process.env.API_URL}/matches/${id}`);
    },
    
}