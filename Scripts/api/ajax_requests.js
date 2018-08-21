//https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
//http://localhost:3000/abonnement?_embed=customers
import axios from 'axios';
const proxy = "https://cors-anywhere.herokuapp.com";
const base = "http://localhost:3000";
export default {
    getAllCustomers() {
        return axios.get(`${base}/customers`)
            .then(res => {
                return res;
            });
    },
    getOneCustomer(id) {
        return axios.get(`${base}/customers/${id}`)
            .then(res => {
                return res;
            });
    },
    getAllAbo() {
        return axios.get(`${base}/abonnement`)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("no abo found");
            })
    },
    getOneAbo(id) {
        return axios.get(`${base}/abonnement/${id}`)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("no abo found on that id");
            })
    },
    findCustomer(str) {
        return axios.get(`${base}/customers?q=${str}`)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("No customers");
            })
    },
    filterAbo(str) {
        return axios.get(`${base}/customers?abo=${str}`)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("err", err);
            })
    },
    updatePortions(id, por, cours) {
        return axios.patch(`${base}/customers/${id}`, {
            portions: parseInt(por),
            abo: cours
        })
        .then(() => {
            return true;
        })
        .catch(err => {
            console.log("Err", err);
            return false;
        })
    },
    updateContactPerson(id, cp) {
        return axios.patch(`${base}/customers/${id}`, {
            contactPerson: cp
        })
        .then(res => {
            return true;
        })
        .catch(err => {
            console.log("update contactperson", err);
            return false;
        })
    }
}
/*
curl -i -X OPTIONS -H "Origin: http://127.0.0.1:1337" \
    -H 'Access-Control-Request-Method: GET' \
    -H 'Access-Control-Request-Headers: Content-Type' \
    "http://192.168.183.106:1338/data/ical.json"

*/
