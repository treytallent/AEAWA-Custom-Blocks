import { store, getContext } from "@wordpress/interactivity"

const { state } = store("artedwa-carousel", {
   state: {
      activeIndex: 1,
      allIds: [],
   },
   actions: {
      setActive: () => {
         const context = getContext()
         state.activeIndex = Number(context.id)
      },
      isActive: () => {
         const context = getContext()
         return Number(context.id) === state.activeIndex
      },
      incrementIndex: () => {
         if (state.activeIndex < 5) {
            state.activeIndex = state.activeIndex + 1
         } else state.activeIndex = 1
      },
      decrementIndex: () => {
         if (state.activeIndex > 1) {
            state.activeIndex = state.activeIndex - 1
         } else state.activeIndex = 5
      },
   },
   callbacks: {
      initPane: () => {
         const { postId } = getContext()
         state.allIds.push(postId)
         getContext().indexValue = state.allIds.length
      },
      setContext: () => {
         const { indexValue } = getContext()
         const activeEval = indexValue === state.activeIndex
         getContext().isActive = activeEval
      },
   },
})
