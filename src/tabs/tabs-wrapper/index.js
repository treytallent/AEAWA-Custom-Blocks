import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["artedwa-blocks/tabs-list"],
   ["artedwa-blocks/panels-list"],
]

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes }) => {
      const { activeId } = attributes
      // console.log("rendering tabs wrapper")

      // Triggers a re-render when a tab block is selected
      // Returns the selected tab block
      const newActiveId = useSelect(select => {
         const block = select("core/block-editor").getSelectedBlock()
         if (block && block.name === "artedwa-blocks/tab") {
            return block.attributes.id
         }
         return null
      }, [])

      // When the newActiveId value changes the attribute of activeId is updated
      useEffect(() => {
         if (newActiveId !== null && newActiveId !== activeId) {
            setAttributes({ activeId: newActiveId })
         }
      }, [newActiveId])

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
