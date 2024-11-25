import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: () => {
      const blockProps = useBlockProps()

      return (
         <a {...blockProps}>
            <img></img>
            <h3>Organisation Name</h3>
         </a>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <a {...blockProps}></a>
   },
})
