import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import { select } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import "./editor.css"
import "./style.css"
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
            <p>{category}</p>
            <img></img>
            <h4>Event Title</h4>
            <div>
               <p>Start Date</p>
               <p>End Date</p>
            </div>
            <p>Short event description</p>
            <a>Read More</a>
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <div {...blockProps}></div>
   },
})
