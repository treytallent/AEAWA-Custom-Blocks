import { useSelect } from "@wordpress/data"
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"
import "./editor.scss"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, clientId }) => {
      const blockProps = useBlockProps()

      function getQueryloopClientId() {
         // Returns the clientId of the topmost query loop block on the page
         const [queryloopClientId] = wp.data
            .select("core/block-editor")
            .getBlocksByName("core/query")
         const queryloopAttributes = wp.data
            .select("core/block-editor")
            .getBlockAttributes(queryloopClientId)

         const allBlocks = wp.data.select("core/block-editor").getBlocks()
      }
      getQueryloopClientId()

      return (
         <div {...blockProps}>
            <InnerBlocks />
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
