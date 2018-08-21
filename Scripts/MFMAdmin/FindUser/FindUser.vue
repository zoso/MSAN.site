<template>
    <div>
        <h2>Se alle abos</h2>
        <p>
            Filterz:
        </p>
        <ul class="list">
            <li>
                <button class="btn" type="button" v-on:click="doFilter('3 retter')">
                    3 retter
                </button>
            </li>
            <li>
                <button class="btn" type="button" v-on:click="doFilter('4 retter')">
                    4 retter
                </button>
            </li>
            <li>
                <button class="btn" type="button" v-on:click="doFilter('5 retter')">
                    5 retter
                </button>
            </li>
            <li>
                <button class="btn" type="button" v-on:click="doFilter('')">
                    Alle
                </button>
            </li>
        </ul>
        <p>
            Totalt antall: {{ this.all_companies.length }}
        </p>
        <table>
            <thead>
                <tr>
                    <th>
                        Navn
                    </th>
                    <th>
                        Adresse
                    </th>
                    <th>
                        Telefon
                    </th>
                    <th>
                        Epost
                    </th>
                    <th>
                        Kontaktperson
                    </th>
                    <th>
                        Abonnement
                    </th>
                    <th>
                        Porsjoner
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in all_companies" :key="post.id">
                    <td>
                        <router-link :to="{ name: 'finduserid', params: { id: post.id }}">{{ post.name }}</router-link>
                    </td>
                    <td>
                        {{ post.address }}
                    </td>
                    <td>
                        <a :href="`tel: ${post.phone}`">{{ post.phone }}</a>
                    </td>
                    <td>
                        <a :href="`mailto: ${post.email}`">{{ post.email }}</a>
                    </td>
                    <td>
                        {{ post.contactPerson }}
                    </td>
                    <td>
                        {{ post.abo }}
                    </td>
                    <td>
                        {{ post.portions }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import GetData from "../../api/ajax_requests.js";
export default {
    data() {
        return {
            all_companies: []
        }
    },
    methods: {
        doFilter(str) {
            if (str !== "") {
                GetData.filterAbo(str)
                .then(res => {
                    this.all_companies = res.data;
                })
                .catch(err => {
                    console.log("error fetching ", err);
                })
            } else {
                GetData.getAllCustomers()
                    .then(res => {
                        this.all_companies = res.data;
                    })
                    .catch(err => {
                        console.log("error", err);
                    })
            }
            
        }
    },
    created() {
        this.doFilter("");
    }
}
</script>

