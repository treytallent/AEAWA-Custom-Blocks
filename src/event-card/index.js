import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import { select } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import "./editor.scss"
import metadata from "./block.json"

// get the parent panel and return it's attribute of "category"
// set it's category attribute to the acf card too

registerBlockType(metadata.name, {
   edit: ({ clientId, setAttributes, attributes }) => {
      const { category } = attributes
      const blockProps = useBlockProps()

      function setCategory() {
         const parentPanel = getParentPanel()
         setAttributes({ category: parentPanel.attributes.selectedCategory })
      }

      // Loops through parents until it returns a parent component of panel
      // Useful for deeply nested acf-card blocks
      function getParentPanel() {
         const parentPanel = select(
            "core/block-editor"
         ).getBlockParentsByBlockName(clientId, ["artedwa-blocks/panel"])
         return select("core/block-editor").getBlock(parentPanel[0])
      }

      useEffect(() => {
         if (!category === null) return
         setCategory()
      }, [clientId])

      return (
         <div {...blockProps}>
            <img></img>
            <div className="card-container">
               <h3 className="h2-sm">Event Title</h3>
               <div className="card-time">
                  <time className="body-sm">Start Date</time>
                  <span>-</span>
                  <time className="body-sm">End Date</time>
               </div>
               <p>Short event description</p>
               <div className="wp-block-button is-style-secondary card-button-end">
                  <a className="wp-block-button__link wp-element-button">
                     Read More
                  </a>
               </div>
            </div>
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <div {...blockProps}></div>
   },
})
