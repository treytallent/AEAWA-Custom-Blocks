import { useBlockProps, getBlockRootClientId } from "@wordpress/block-editor"
import { useDispatch, select } from "@wordpress/data"
import { createBlock, registerBlockType } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"
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
      const { insertBlock } = useDispatch("core/block-editor")

      const tabsListClientId =
         select("core/block-editor").getBlockRootClientId(clientId)

      const tabsWrapperClientId =
         select("core/block-editor").getBlockRootClientId(tabsListClientId)

      const activeId =
         select("core/block-editor").getBlockAttributes(
            tabsWrapperClientId
         ).activeId
      // console.log("activeId from tab:", activeId)

      let isActive = id === activeId

      const indexValue = wp.data
         .select("core/block-editor")
         .getBlockIndex(clientId, ["artedwa-blocks/tab"])

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
         // setActiveIcon(jsx)
         setAttributes({ icon: string })
      }

      const blockProps = useBlockProps()

      return (
         <div {...blockProps} className={isActive ? "active" : ""}>
            <DropdownMenu
               // icon={activeIcon}
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
