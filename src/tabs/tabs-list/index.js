import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [["artedwa-blocks/tab"], ["artedwa-blocks/tab"]]

registerBlockType(metadata.name, {
   edit: () => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <InnerBlocks template={blocktemplate} orientation="vertical" />
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
