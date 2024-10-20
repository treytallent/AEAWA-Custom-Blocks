import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import { createBlock } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"
import { store as blockEditorStore } from "@wordpress/block-editor"
import { useDispatch } from "@wordpress/data"

registerBlockType(metadata.name, {
   edit: props => {
      const { insertBlock } = useDispatch(blockEditorStore)
      const indexValue = wp.data
         .select("core/block-editor")
         .getBlockIndex(props.clientId, ["artedwa-blocks/tab"])

      useEffect(() => {
         console.log("running useeffect")
         // Sets the attribute Id to it's index value in the parent array
         if (!props.attributes.id === undefined) return
         setId()

         // Places a new tab panel when a new tab is inserted
         const justInserted = wp.data
            .select("core/block-editor")
            .wasBlockJustInserted(props.clientId)

         if (!justInserted) return
         addTabPanel()
      }, [props.clientId])

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
         props.setAttributes({ id: indexValue })
      }

      const blockProps = useBlockProps()
      return <button {...blockProps}>Button</button>
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <button {...blockProps}>Button</button>
   },
})
