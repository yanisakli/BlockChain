<template>
    <div class="is-pulled-left" v-on:click="goBack">
        <b-button
                size="is-medium"
                class="go-back"
                icon-pack="fas"
                icon-left="arrow-circle-left">
            Back
        </b-button>
    </div>
</template>

<script>
	import { Component, Vue } from "vue-property-decorator"

    @Component
	export default class GoBackComponent extends Vue {
		goBack() {
			console.log("goBack", this)
			this.$router.go(-1)
		}
	}

</script>

<style scoped>
    .go-back {
        cursor: pointer;
    }
</style>
