import { store, getContext, getElement } from "@wordpress/interactivity"
const { state } = store("scrolling-carousel", {
   state: {},
   actions: {
      incrementContainer: () => {
         const ul = document.querySelector(
            ".wp-block-artedwa-blocks-scrolling-carousel ul"
         )
         ul.scrollBy({
            left: 212,
            behavior: "smooth",
         })
      },
      decrementContainer: () => {
         const ul = document.querySelector(
            ".wp-block-artedwa-blocks-scrolling-carousel ul"
         )
         ul.scrollBy({
            left: -212,
            behavior: "smooth",
         })
      },
   },
   callbacks: {},
})
