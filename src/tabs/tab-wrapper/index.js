import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["artedwa-blocks/tab-header"],
   ["artedwa-blocks/tab-header"],
]

registerBlockType(metadata.name, {
   // Pre fills the innerblocks content with two tab-headers when the tab-wrapper block is placed

   edit: () => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps} className="tab-wrapper-edit-container">
            <InnerBlocks template={blocktemplate} orientation="horizontal" />
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
