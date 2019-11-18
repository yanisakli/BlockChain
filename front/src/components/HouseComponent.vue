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
                                <b-button type="is-success">I am interessted</b-button>
                            </span>
                            </div>
                            <div class="footer-content">
                                <span class="has-text-white subtitle">{{ price }} Ethereum</span>
                            </div>
                        </div>
                        <div v-else class="default-content">
                            <div class="head-content">

                            </div>
                            <div class="body-content">
                                <span class="has-text-white subtitle house-name">{{ address }}</span>
                            </div>
                            <div class="footer-content">
                                <span class="has-text-white subtitle">{{ price }} Ethereum</span>
                            </div>
                        </div>
                    </transition>
                    <img src="https://nomadlist.com/assets/img/cities/mexico-city-mexico-600px.jpg"
                         class="image is-3by2" alt="">
                </div>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({
    props: {
      id: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      }
    },
  })
  export default class HouseComponent extends Vue {
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
