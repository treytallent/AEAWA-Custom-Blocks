import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import metadata from "./block.json"

const blocktemplate = [["aeawa-blocks/panel"], ["aeawa-blocks/panel"]]

registerBlockType(metadata.name, {
   edit: () => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <InnerBlocks
               template={blocktemplate}
               orientation="vertical"
               renderAppender={false}
            />
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
