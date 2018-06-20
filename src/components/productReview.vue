<template>
  <form class="review" @submit.prevent="formSubmit">
    <p><label>Review:</label>
      <textarea id="review" v-model="review" required></textarea>
    </p>
    <p> <label>Rating:</label>
      <select id="rating" v-model="rating">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      </select>
    </p>
    <p>
      <button name="review" value="Submit" >Submit</button>
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      review: null,
      rating: null
      }
  },
  methods: {
    formSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      }
      this.$emit('review-submitted', productReview);
      this.name = null,
      this.review = null,
      this.rating = null
    }
  }
}
</script>

