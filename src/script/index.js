import Vue from 'vue'
import axios from 'axios';

Vue.component('product', {

        props: {
            prime: {
                type: Boolean,
                required: true
            },

        },

        template: `   <div class="product">
   
    <div class="product__images">
        <img class="product__image" v-bind:src="image">
    </div>
    <div class="product__details">
    <h1>{{ product }}</h1>
    <p v-if="inStock">In stock</p>
    <p v-else>Sold Out !</p>
    <p>Shipping {{ shippingCost }}</p>
   <product-details :pdetails="pdetails"></product-details>
   <div class="product__varity">
   <div class="color-box" v-for="(varity,index) in varities" :style="{backgroundColor: varity.color}" @mouseover="updateProduct(index)">
   </div>
</div>
<p class="sale" v-show="onSale">On sale!!</p>
</div>

    <div class="product__cart">
        <button class="product__cart--btn"   @click="addToCart" :disabled="!inStock" :class="{disableAddBtn: !inStock}">Add to cart</button>
        <button class="product__cart--btn" @click="removeFromCart">Remove Item</button>
    </div>
    <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet.</p>
    <ul>
      <li v-for="review in reviews">
      <p>{{ review.name }}</p>
      <p>Rating: {{ review.rating }}</p>
      <p>{{ review.review }}</p>
      </li>
    </ul>
   </div>
    <product-review @review-submitted="addReview"></product-review>

</div>`,

        data() {
            return {
                product: 'dress',
                pdetails: ["Material: Cotton"],
                onSale: true,
                isSelected: 0,
                varities: [{
                        varityId: 1,
                        image: './src/assets/img/drs.png',
                        color: 'white',
                        size: ["S", "M"],
                        count: 10
                    },
                    {
                        varityId: 2,
                        image: './src/assets/img/blue_drs.png',
                        color: 'blue',
                        size: ["S"],
                        count: 2
                    },
                ],
                reviews: []
            }
        },

        methods: {
            addToCart: function() {
                this.$emit('add-to-cart', this.varities[this.isSelected].varityId)
            },
            removeFromCart: function() {

                this.$emit('remove-from-cart', this.varities[this.isSelected].varityId)
            },
            updateProduct: function(index) {
                this.isSelected = index;
            },
            addReview: function(productReview) {

                this.reviews.push(productReview)

            }

        },
        computed: {
            image: function() {
                return this.varities[this.isSelected].image;
            },
            inStock: function() {
                return this.varities[this.isSelected].count;
            },
            shippingCost() {
                if (this.prime) {
                    console.log(this.prime);
                    return "Free";
                } else {
                    return 9.99;
                }
            }
        }
    }),

    Vue.component('product-details', {
        props: {
            pdetails: {
                type: Array,
                required: true
            }
        },
        template: ` <ul>
            <li v-for="detail in pdetails">{{ detail }}</li>
        </ul>`
    }),

    Vue.component('product-review', {
        template: ` <form class="review" @submit.prevent="formSubmit">
        <p>
        <label>Review:</label>
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
        </form>`,
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
    })

var app = new Vue({
    el: '#app',
    // render: h => h(App)
    data: {
        prime: true,
        cart: [],
        posts: [],
        errors: []

    },
    methods: {
        updateCart(id) {

            this.cart.push(id);
        },

        removeFrmCart(id) {
            console.log(id + " " + this.cart.length);
            // debugger;
            for (let item = 0; item < this.cart.length; item++) {
                console.log(this.cart[item]);
                if (this.cart[item] === id) {
                    this.cart.pop(id);
                    console.log("this.cart ", this.cart);
                    break;
                }
            }
        }

    },
    created() {

        axios.get(`http://localhost:8080/shopping-cart-management/`

            )
            .then(response => {
                this.posts = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
    }

})

export default app;