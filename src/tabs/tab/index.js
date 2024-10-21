import {
   useBlockProps,
   store as blockEditorStore,
} from "@wordpress/block-editor"
import { useDispatch } from "@wordpress/data"
import { createBlock, registerBlockType } from "@wordpress/blocks"
import { useEffect, useState } from "@wordpress/element"
import { DropdownMenu } from "@wordpress/components"
import {
   academicCapJSX,
   academicCapString,
   pencilJSX,
   pencilString,
   paintBrushJSX,
   paintBrushString,
   informationCircleJSX,
   informationCircleString,
} from "./icons"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, clientId, isSelected }) => {
      const { title, id } = attributes
      const [activeIcon, setActiveIcon] = useState()
      const { insertBlock } = useDispatch(blockEditorStore)
      const indexValue = wp.data
         .select("core/block-editor")
         .getBlockIndex(clientId, ["artedwa-blocks/tab"])
      const [activeTabIndex, setActiveTabIndex] = useState(0)

      useEffect(() => {
         // Sets the attribute Id to it's index value in the parent array
         if (!id === undefined) return
         setId()

         // Sets the icon for new tabs
         if (!attributes.icon === undefined) return
         updateIcon(informationCircleJSX, informationCircleString)

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

      function updateIcon(jsx, string) {
         setActiveIcon(jsx)
         setAttributes({ icon: string })
      }

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
            <DropdownMenu
               icon={activeIcon}
               label="Select an icon"
               className="tabs-dropdownmenu"
               controls={[
                  {
                     title: "Academic Cap",
                     icon: academicCapJSX,
                     onClick: () =>
                        updateIcon(academicCapJSX, academicCapString),
                  },
                  {
                     title: "Pencil",
                     icon: pencilJSX,
                     onClick: () => updateIcon(pencilJSX, pencilString),
                  },
                  {
                     title: "Paint Brush",
                     icon: paintBrushJSX,
                     onClick: () => updateIcon(paintBrushJSX, paintBrushString),
                  },
               ]}
            />
            {isSelected ? (
               <input
                  {...blockProps}
                  value={attributes.title}
                  onChange={e =>
                     setAttributes((attributes.title = e.target.value))
                  }
               ></input>
            ) : (
               <h4>{attributes.title}</h4>
            )}
         </div>
      )
   },
   save: props => {
      const blockProps = useBlockProps.save()
      return (
         <button {...blockProps}>
            {props.attributes.icon}
            Button
         </button>
      )
   },
})
