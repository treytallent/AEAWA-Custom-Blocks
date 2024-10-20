import {
   useBlockProps,
   store as blockEditorStore,
} from "@wordpress/block-editor"
import { useDispatch } from "@wordpress/data"
import { createBlock, registerBlockType } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"

import "./style.css"
import "./editor.css"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, clientId }) => {
      const { title, id } = attributes
      const { insertBlock } = useDispatch(blockEditorStore)

      const indexValue = wp.data
         .select("core/block-editor")
         .getBlockIndex(clientId, ["artedwa-blocks/tab"])

      useEffect(() => {
         // Sets the attribute Id to it's index value in the parent array
         if (!id === undefined) return
         setId()

         // Places a new tab panel when a new tab is inserted
         const justInserted = wp.data
            .select("core/block-editor")
            .wasBlockJustInserted(clientId)
         if (!justInserted) return
         addTabPanel()
      }, [clientId])

      function addTabPanel() {
         const panelsListClientId = wp.data
            .select("core/block-editor")
            .getBlocksByName("artedwa-blocks/panels-list")

         const newPane = createBlock("artedwa-blocks/panel", {
            id: indexValue,
         })
         insertBlock(newPane, indexValue, panelsListClientId[0])
      }

      function setId() {
         setAttributes({ id: indexValue })
      }

      const blockProps = useBlockProps()

      return (
         <div {...blockProps}>
            <input
               {...blockProps}
               value={attributes.title}
               onChange={e =>
                  setAttributes((attributes.title = e.target.value))
               }
            ></input>
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <button {...blockProps}>Button</button>
   },
})
