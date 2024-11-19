import { useBlockProps, InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes: { id, isActive }, setAttributes, clientId }) => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <InnerBlocks />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
