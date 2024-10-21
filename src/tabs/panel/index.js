import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
   InnerBlocks,
   useBlockProps,
   store as blockEditorStore,
} from "@wordpress/block-editor"
import { useEffect, useState } from "@wordpress/element"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["core/paragraph", { placeholder: "Modify tab content" }],
]

registerBlockType(metadata.name, {
   edit: props => {
      const indexValue = wp.data
         .select("core/block-editor")
         .getBlockIndex(props.clientId, ["artedwa-blocks/tab"])
      const [activeTabIndex, setActiveTabIndex] = useState(0)

      // Sets the attribute id equal to the index value of a panel within it's parent panels-list
      useEffect(() => {
         if (!props.attributes.id === undefined) return

         props.setAttributes({ id: indexValue })
      })

      const getActiveBlockData = () => {
         const activeBlock = wp.data.select(blockEditorStore).getSelectedBlock()

         if (activeBlock && activeBlock.name === "artedwa-blocks/tab") {
            setActiveTabIndex(activeBlock.attributes.id)
         }
         return
      }

      // Later: set this on a higher level component to improve performance
      wp.data.subscribe(() => {
         getActiveBlockData()
      })

      const blockProps = useBlockProps()
      return (
         <div
            {...blockProps}
            className={activeTabIndex === indexValue ? "is-active" : null}
         >
            <InnerBlocks template={blocktemplate} orientation="vertical" />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
