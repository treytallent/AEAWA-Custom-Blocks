import { store, getContext } from "@wordpress/interactivity"

const { state } = store("aeawa", {
   state: {
      activeId: 0,
   },
   actions: {
      isActive: () => {
         const context = getContext()
         return context.id === state.activeId
      },
      setActive: () => {
         const context = getContext()
         state.activeId = context.id
      },
   },
   callbacks: {},
})
