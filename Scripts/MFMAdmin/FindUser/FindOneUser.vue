<template>
    <div>
        <h2>
            {{ myData.name }}
        </h2>
        <div class="row">
            <div class="col">
                Her kan det administrers over en lav sko
            </div>
            <div class="col">
                <div>
                    Navn: {{ myData.name }}
                </div>
                <div>
                    Adresse: {{ myData.address}}
                </div>
                <div>
                    Telefon: <a :href="`tel: ${myData.phone}`">{{ myData.phone }}</a>
                </div>
                <div>
                    Email: <a :href="`mailto: ${myData.email}`">{{ myData.email }}</a>
                </div>
                <div>
                    Kontaktperson: {{ myData.contactPerson }}
                </div>
                <div>
                    Abonnement: {{ myData.abo }}
                </div>
                <div>
                    Porsjoner: {{ myData.portions }}
                </div>
            </div>
        </div>
        <div class="row" v-if="editContact">
            <div class="col">
                <div>
                    <label for="contactPerson">Kontaktperson:</label>
                    <input type="text" id="contactPerson" :value="myData.contactPerson">
                </div>
                <button class="btn" type="button" v-on:click="updateContactPerson">
                    Endre
                </button>
            </div>
        </div>
        <div class="row" v-if="endAbo">
            <div class="col-sm-12">
                Avslutte abonnement. Merk at abonnementet avsluttes om 2 uker.
            </div>
            <div class="col-sm-12">
                <button class="btn" type="button" v-on:click="endAbonnement">
                    Ja, jeg vil avslutte
                </button>
            </div>
        </div>
        <div class="row" v-if="editAbo">
            <div class="col">
                <div class="row">
                    <div class="col-sm-12">
                        <label for="courses">Endre meny</label>
                        <select name="courses" id="courses" v-on:change="doCoursesChange">
                            <option value="3 retter" :selected="editCourses === '3 retter' ? true : false">3 retter</option>
                            <option value="4 retter" :selected="editCourses === '4 retter' ? true : false">4 retter</option>
                            <option value="5 retter" :selected="editCourses === '5 retter' ? true : false">5 retter</option>
                        </select>
                    </div>
                    <div class="col-sm-12">
                        <!-- http://rangeslider.js.org/ -->
                        <label for="portions">50 - 120 porsjoner</label>
                        <input v-model="editPortions" type="range" id="portions" min="50" max="120" step="10" v-on:change="doPortionChange">
                        <p>Antall porsjoner: {{ editPortions }}</p>
                    </div>
                </div>
                <button class="btn" type="button" v-on:click="updatePortions">
                    Oppdatér
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn" type="button">
                    Se siste faktura
                </button>
            </div>
            <div class="col">
                <button class="btn" type="button" v-on:click="doEditContact">
                    Endre kontaktinformasjon
                </button>
            </div>
            <div class="col">
                <button class="btn" type="button" v-on:click="changeAbo">
                    Endre abonnement
                </button>
            </div>
            <div class="col">
                <button class="btn" type="button" v-on:click="endAbonnement">
                    Avslutt abo. ({{ myData.abo }})
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import GetData from "../../api/ajax_requests.js";
export default {
    name: "FindOneUser",
    data() {
        return {
            myID: this.$route.params.id,
            myData: {},
            editAbo: false,
            endAbo: false,
            editContact: false,
            editCourses: "",
            editPortions: 0
        }
    },
    created() {
        GetData.getOneCustomer(this.myID)
            .then(res => {
                //if length > 0
                this.myData = res.data;
                this.editPortions = res.data.portions;
                this.editCourses = res.data.abo;
            })
            .catch(err => {
                console.log("error", err);
            })
    },
    methods: {
        changeAbo() {
            this.editAbo = !this.editAbo;
        },
        doPortionChange(e) {
            this.editPortions = e.target.value;
        },
        doCoursesChange(e) {
            this.editCourses = e.target.value;
        },
        doEditContact() {
            this.editContact = !this.editContact;
        },
        updatePortions() {
            GetData.updatePortions(this.myID, this.editPortions, this.editCourses)
                .then(res => {
                    if (res) {
                        this.myData.portions = this.editPortions;
                        this.myData.abo = this.editCourses;
                        this.editAbo = false;
                    } else {
                        console.log("error updating portions");
                    }
                })
        },
        updateContactPerson(e) {
            console.log("updating", document.getElementById("contactPerson").value);
            GetData.updateContactPerson(this.myID, document.getElementById("contactPerson").value)
                .then(res => {
                    if (res) {
                        this.myData.contactPerson = document.getElementById("contactPerson").value;
                        this.doEditContact();
                    } else {
                        console.log("error updating contact person");
                    }
                })
        },
        endAbonnement() {
            this.endAbo = !this.endAbo;
        }
    }
}
</script>

