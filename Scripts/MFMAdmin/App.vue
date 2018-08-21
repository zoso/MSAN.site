<template>
    <div class="flex-container">
        <header class="flex-header">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-sm-8">
                        <HeaderComp />
                    </div>
                </div>
            </div>
        </header>
        <nav class="flex-nav">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-sm-8">
                        <ul class="nav">
                            <!-- <li class="nav-item">
                                 <router-link to="/">Front</router-link>
                            </li> -->
                            <li class="nav-item">
                                 <router-link to="/finduser">Alle abonnenter</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/findabo">Søk abonnement</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <main class="flex-main">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-sm-8">
                        <router-view name="mainView"/>
                    </div>
                </div>
            </div>
        </main>
        <footer class="flex-footer">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-sm-8">
                        <FooterComp />
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import HeaderComp from "./components/HeaderComp.vue";
import FooterComp from "./components/FooterComp.vue";
export default {
    name: "mfmadmin",
    components: {
        HeaderComp,
        FooterComp
    }
}
</script>
