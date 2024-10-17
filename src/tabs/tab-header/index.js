import { __ } from "@wordpress/i18n"
import { useEffect } from "@wordpress/element"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import { TextControl } from "@wordpress/components"

import "./style.css"
import "./editor.css"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, isSelected }) => {
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
               className="tab-header-edit-input"
            />
            <InnerBlocks orientation="vertical" />
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
