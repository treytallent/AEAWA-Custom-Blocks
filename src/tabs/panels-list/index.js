import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import "./editor.css"
import "./style.css"
import metadata from "./block.json"

const blocktemplate = [["artedwa-blocks/panel"], ["artedwa-blocks/panel"]]

registerBlockType(metadata.name, {
   edit: () => {
      // console.log("rendering panels list")
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
