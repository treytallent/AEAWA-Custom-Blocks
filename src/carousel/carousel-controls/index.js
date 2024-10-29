import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"
import { arrowLeft, arrowRight } from "/src/tabs/tabs-wrapper/icons.js"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes }) => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <button>{arrowLeft}</button>
            <button>{arrowRight}</button>
         </div>
      )
   },
})
