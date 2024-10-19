import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["core/paragraph", { placeholder: "Modify tab content" }],
]

registerBlockType(metadata.name, {
   edit: props => {
      // Sets the attribute id equal to the index value of a panel within it's parent panels-list
      useEffect(() => {
         if (!props.attributes.id === undefined) return
         const indexValue = wp.data
            .select("core/block-editor")
            .getBlockIndex(props.clientId, ["artedwa-blocks/tab"])

         props.setAttributes({ id: indexValue })
      })

      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <InnerBlocks template={blocktemplate} orientation="vertical" />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
