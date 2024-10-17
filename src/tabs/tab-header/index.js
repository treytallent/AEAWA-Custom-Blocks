import { __ } from "@wordpress/i18n"
import { useEffect } from "@wordpress/element"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import { TextControl } from "@wordpress/components"

import "./style.css"
import "./editor.css"
import metadata from "./block.json"

// Returns true/false if an innerblock of a tab header is selected.
function hasSelectedInnerBlock(props) {
   const select = wp.data.select("core/block-editor")
   const selected = select.getBlockSelectionStart()
   const inner = select.getBlock(props.clientId).innerBlocks
   for (let i = 0; i < inner.length; i++) {
      if (
         inner[i].clientId === selected ||
         (inner[i].innerBlocks.length && hasSelectedInnerBlock(inner[i]))
      ) {
         return true
      }
   }
   return false
}

registerBlockType(metadata.name, {
   edit: props => {
      const attributes = props.attributes
      const setAttributes = props.setAttributes
      const isSelected = props.isSelected
      // Expands the functionality of isSelected to include the selection of child elements
      const selected = props.isSelected || hasSelectedInnerBlock(props)

      useEffect(() => {
         if (!attributes.id) {
            setAttributes((attributes.id = crypto.randomUUID()))
         }
      })

      const blockProps = useBlockProps()
      return (
         <div {...blockProps} className="tab-header-edit-container">
            <TextControl
               value={attributes.title}
               onChange={e => setAttributes((attributes.title = e))}
               type="text"
               disabled={!selected}
            />
            {selected && <InnerBlocks orientation="vertical" />}
         </div>
      )
   },
   save: props => {
      const blockProps = useBlockProps.save()
      return (
         <div {...blockProps}>
            <h4>{props.attributes.title}</h4>
            <InnerBlocks.Content />
         </div>
      )
   },
})
