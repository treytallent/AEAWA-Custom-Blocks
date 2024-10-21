import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
   InnerBlocks,
   useBlockProps,
   store as blockEditorStore,
} from "@wordpress/block-editor"
import { useDispatch, select } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["core/paragraph", { placeholder: "Modify tab content" }],
]

registerBlockType(metadata.name, {
   edit: ({ clientId, attributes, setAttributes }) => {
      const { id } = attributes
      const panelsListClientId =
         select("core/block-editor").getBlockRootClientId(clientId)

      const tabsWrapperClientId =
         select("core/block-editor").getBlockRootClientId(panelsListClientId)

      const activeId =
         select("core/block-editor").getBlockAttributes(
            tabsWrapperClientId
         ).activeId

      let isActive = id === activeId

      const indexValue = wp.data
         .select("core/block-editor")
         .getBlockIndex(clientId, ["artedwa-blocks/tab"])

      // Sets the attribute id equal to the index value of a panel within it's parent panels-list
      useEffect(() => {
         if (!attributes.id === undefined) return
         setAttributes({ id: indexValue })
      })

      const blockProps = useBlockProps()
      return (
         <div {...blockProps} className={isActive ? "active" : ""}>
            <InnerBlocks template={blocktemplate} orientation="vertical" />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
