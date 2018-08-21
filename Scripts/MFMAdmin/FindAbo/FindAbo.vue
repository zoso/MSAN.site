<template>
    <div>
        <form @submit.prevent="doSearch">
            <h2>
                Søk etter barnehage(r)
            </h2>
            <label for="findAbo">
                Barnehage:
            </label>
            <input type="text" id="findAbo" v-model="current">
            <button class="btn" type="submit" id="btnFindAbo" v-on:click="doSearch" :disabled="isDisabled">
                Find abonnement
            </button>
        </form>
        <div v-if="searchResult.length > 0">
            <p>Antall treff: {{ searchResult.length }}</p>
            <ul v-for="post in this.searchResult" :key="post.id">
                <li>
                    Navn: <router-link :to="{ name: 'finduserid', params: { id: post.id }}">{{ post.name }}</router-link>
                </li>
            </ul>
        </div>
        <div v-html="errorStr">
            {{ errorStr }}
        </div>
    </div>
</template>

<script>
import GetData from "../../api/ajax_requests.js";
export default {
    name: "FindAbo",
    data() {
        return {
            current: "",
            searching: false,
            errorStr: "",
            searchResult: []
        }
    },
    methods: {
        doSearch(e) {
            e.preventDefault();
            this.searching = true;
            this.errorStr = "";
            this.searchResult = [];
            GetData.findCustomer(this.current)
                .then(res => {
                    if (res.data.length > 0) {
                        this.searchResult = res.data;
                    } else {
                        this.errorStr = "<p>Ingen treff. Prøv igjen</p>";
                    }
                    this.searching = false;
                })
        }
    },
    computed: {
        isDisabled() {
            return this.searching;
        }
    }
}
</script>

