<template>
    <div class="house">
        <article class="media">
            <div class="media-content">
                <div class="content house"
                        @mouseover="isHovered = true"
                        @mouseleave="isHovered = false">
                    <transition name="slide-fade">
                        <div v-if="isHovered" class="hover-content">
                            <div class="head-content">

                            </div>
                            <div class="body-content">
                            <span class="has-text-centered">
                                <b-button tag="router-link" :to="{ name: 'AppOneHouse', params: {id: House.id} }" type="is-success">I am interested</b-button>
                            </span>
                            </div>
                            <div class="footer-content">
                                <span class="has-text-white subtitle">{{ House.price }} Ethereum</span>
                            </div>
                        </div>
                        <div v-else class="default-content">
                            <div class="head-content">
                                <span class="has-text-white subtitle">{{ House.country }}</span>
                            </div>
                            <div class="body-content">
                                <span class="has-text-white subtitle house-name">{{ House.postalAddress }}</span>
                            </div>
                            <div class="footer-content">
                                <span class="has-text-white subtitle">{{ House.price }} Ethereum</span>
                            </div>
                        </div>
                    </transition>
                    <img src="../assets/house.jpg"
                         class="image is-3by2" alt="">
                </div>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator"
  import { House } from '@/definitions'

  @Component
  export default class HouseComponent extends Vue {
    @Prop() House!: House
    isHovered = false
  }
</script>

<style scoped="scss">
    .house {
        position: relative;
    }

    .is-3by2 {
        padding: 0 !important;
        border-radius: 5%;
    }

    .default-content, .hover-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        z-index: 999;
        width: 100%;
        height: 100%;
    }
    .hover-content {
        background-color: #0000004d;
    }

    .house-name {
        background-color: #00000061;
        border-radius: 3px;
        padding: 0.5em;
    }
    p.title {
        margin: 0;
    }
</style>
