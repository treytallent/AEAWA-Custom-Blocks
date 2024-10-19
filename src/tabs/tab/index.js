import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: props => {
      // Sets the attribute id equal to the index value of a tab within it's parent tab-list
      useEffect(() => {
         if (!props.attributes.id === undefined) return
         const indexValue = wp.data
            .select("core/block-editor")
            .getBlockIndex(props.clientId, ["artedwa-blocks/tab"])

         props.setAttributes({ id: indexValue })
      })

      const blockProps = useBlockProps()
      return <button {...blockProps}>Button</button>
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <button {...blockProps}>Button</button>
   },
})
