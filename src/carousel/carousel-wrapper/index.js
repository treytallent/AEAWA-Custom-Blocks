import { useSelect } from "@wordpress/data"
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"
import "./editor.scss"

registerBlockType(metadata.name, {
   edit: ({ attributes: { activeId, postIds }, setAttributes, clientId }) => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <InnerBlocks />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return (
         <div {...blockProps}>
            <InnerBlocks.Content />
         </div>
      )
   },
})
