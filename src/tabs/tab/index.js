import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes }) => {
      console.log(attributes.id, "id values")

      const blockProps = useBlockProps()
      return <button {...blockProps}>{"Tab Block"}</button>
   },
})
