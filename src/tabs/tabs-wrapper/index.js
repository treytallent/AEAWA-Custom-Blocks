import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["artedwa-blocks/tabs-list"],
   ["artedwa-blocks/panels-list"],
]

registerBlockType(metadata.name, {
   edit: () => {
      const blockProps = useBlockProps()
      return (
         <section {...blockProps}>
            <InnerBlocks
               template={blocktemplate}
               orientation="vertical"
               renderAppender={false}
            />
         </section>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return (
         <section {...blockProps}>
            <InnerBlocks.Content />
         </section>
      )
   },
})
