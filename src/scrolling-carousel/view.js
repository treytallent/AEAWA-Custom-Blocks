import { store } from "@wordpress/interactivity"
const { state } = store("scrolling-carousel", {
   state: {},
   actions: {
      incrementContainer: () => {
         const ul = document.querySelector(
            ".wp-block-aeawa-blocks-scrolling-carousel ul"
         )
         ul.scrollBy({
            left: 212,
            behavior: "smooth",
         })
      },
      decrementContainer: () => {
         const ul = document.querySelector(
            ".wp-block-aeawa-blocks-scrolling-carousel ul"
         )
         ul.scrollBy({
            left: -212,
            behavior: "smooth",
         })
      },
   },
   callbacks: {},
})
