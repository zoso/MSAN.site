//https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
//http://localhost:3000/abonnement?_embed=customers
//http://ngasweb1t/api/konsept/Mat_For_Minsten/abonnement
import axios from 'axios';
import faker from 'faker';
faker.locale = "nb_NO";

const proxy = "https://cors-anywhere.herokuapp.com";
const base = "http://localhost:3000";

const createPerson = () => {
    const obj = {
        "Fornavn": faker.name.firstName(),
        "Etternavn": faker.name.lastName(),
        "Adresse": faker.address.secondaryAddress(),
        "Postnummer": faker.address.zipCode(),
        "Poststed": faker.address.city(),
        "Mobilnummer": faker.phone.phoneNumber(),
        "Telefonnummer": faker.phone.phoneNumber(),
        "Epost": faker.internet.email(),
        "Dagligleder": faker.random.boolean(),
        "Innkjøpsansvarlig": faker.random.boolean(),
        "Økonomiansvarlig": faker.random.boolean(),
        "Stilling": faker.name.jobDescriptor()
    };
    return obj;
}

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
    },
    testGetAbo() {
        return axios.get('http://ngasweb1t.norgesgruppen.no/api/konsept/Mat_For_Minsten/abonnement')
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log("err", err);
            })
    },
    createContactPerson() {
        var person = createPerson();
        console.log("createPerson", person);
        return axios.post('http://ngasweb1t.norgesgruppen.no/api/kundekontakt', {
            person
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    },
    getContactPerson() {
        return createPerson();
    }
}

/*
{
  "Id": 0,
  "Fornavn": "string",
  "Etternavn": "string",
  "Adresse": "string",
  "Postnummer": "string",
  "Poststed": "string",
  "Mobilnummer": "string",
  "Telefonnummer": "string",
  "Epost": "string",
  "Dagligleder": true,
  "Innkjøpsansvarlig": true,
  "Økonomiansvarlig": true,
  "Stilling": "string"
}
*/

/*
curl -i -X OPTIONS -H "Origin: http://127.0.0.1:1337" \
    -H 'Access-Control-Request-Method: GET' \
    -H 'Access-Control-Request-Headers: Content-Type' \
    "http://192.168.183.106:1338/data/ical.json"

*/
