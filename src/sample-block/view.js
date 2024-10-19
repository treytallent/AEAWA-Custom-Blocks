/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity"

const { state } = store("artedwa", {
   state: {
      get themeText() {
         return state.isDark ? state.darkText : state.lightText
      },
   },
   actions: {
      toggleOpen() {
         const context = getContext()
         context.isOpen = !context.isOpen
      },
      toggleTheme() {
         state.isDark = !state.isDark
      },
   },
   callbacks: {
      logIsOpen: () => {
         // const { isOpen } = getContext()
         // Log the value of `isOpen` each time it changes.
         // console.log("logging from sample block")
         // console.log(`Is open: ${isOpen}`)
      },
   },
})
