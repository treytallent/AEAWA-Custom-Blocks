import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import metadata from "./block.json"
import "./style.scss"
import "./editor.scss"

registerBlockType(metadata.name, {
   edit: () => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <InnerBlocks orientation="vertical" />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
