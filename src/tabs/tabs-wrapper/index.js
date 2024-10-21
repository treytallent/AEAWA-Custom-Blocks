import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
   InnerBlocks,
   useBlockProps,
   store as blockEditorStore,
} from "@wordpress/block-editor"
import { select, useSelect } from "@wordpress/data"
import { useCallback, useEffect } from "@wordpress/element"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["artedwa-blocks/tabs-list"],
   ["artedwa-blocks/panels-list"],
]

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, clientId }) => {
      const { activeId } = attributes

      console.log("tabs wrapper client id:", clientId)

      const activeBlock = useSelect(
         select => select("core/block-editor").getSelectedBlock(),
         []
      )

      useEffect(() => {
         if (!activeBlock) return
         if (activeBlock.name !== "artedwa-blocks/tab") return
         const activeTabId = activeBlock.attributes.id
         if (activeTabId === activeId) return
         setAttributes({ activeId: activeTabId })
      }, [activeBlock, activeId, setAttributes])

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
