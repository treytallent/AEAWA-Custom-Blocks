import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { select, useDispatch, useSelect } from "@wordpress/data"
import { createBlock, registerBlockType } from "@wordpress/blocks"
import {
   DropdownMenu,
   TextControl,
   SelectControl,
   PanelBody,
} from "@wordpress/components"
import { useEffect } from "@wordpress/element"
import {
   academicCap,
   pencil,
   paintBrush,
   informationCircle,
   openBook,
   books,
   globe,
   certificate,
   chatBubble,
   rectangleGroup,
   userGroup,
} from "../tabs-wrapper/icons"

import metadata from "./block.json"
import { renderToString } from "react-dom/server"

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, clientId }) => {
      const { title, id, icon, isActive, selectedCategory } = attributes
      const { insertBlock } = useDispatch("core/block-editor")

      // Triggers a re-render when a new activeId value is set
      // Returns the attribute activeId from the parent tabs-wrapper
      const { activeTabId, categories } = useSelect(select => {
         const parentBlockId =
            select("core/block-editor").getBlockHierarchyRootClientId(clientId)
         const attr =
            select("core/block-editor").getBlockAttributes(parentBlockId)
         return {
            activeTabId: attr.activeId,
            categories: attr.selectedTaxonomyCategories,
         }
      }, [])

      // Sets the isActive attribute to either true or false each time the value of activeTabId changes
      useEffect(() => {
         if (activeTabId !== null && activeTabId === id) {
            setAttributes({ isActive: true })
         } else if (activeTabId !== null && activeTabId !== id) {
            setAttributes({ isActive: false })
         }
         return
      }, [activeTabId])

      // Only runs on the first mount
      useEffect(() => {
         // Sets the attribute id to it's index value in the parent array
         if (!id === undefined) return
         const indexValue = wp.data
            .select("core/block-editor")
            .getBlockIndex(clientId, ["artedwa-blocks/tab"])
         setAttributes({ id: indexValue })

         // Sets the icon for new tabs
         if (!icon === undefined) return
         onChangeIcon(informationCircle)

         // Places a new tab panel when a new tab is inserted
         const justInserted = wp.data
            .select("core/block-editor")
            .wasBlockJustInserted(clientId)
         if (!justInserted) return
         addTabPanel(indexValue)
      }, [clientId])

      function addTabPanel(indexValue) {
         const panelsListClientId = wp.data
            .select("core/block-editor")
            .getBlocksByName("artedwa-blocks/panels-list")

         const newPane = createBlock("artedwa-blocks/panel", {
            id: indexValue,
         })
         insertBlock(newPane, indexValue, panelsListClientId[0])
      }

      function onChangeCategory(newSelectedCategory) {
         setAttributes({ selectedCategory: newSelectedCategory })
      }

      function onChangeTitle(newTitle) {
         setAttributes({ title: newTitle })
      }

      // When selecting a new icon, it is converted to a string and set as the icon attribute
      function onChangeIcon(newIcon) {
         setAttributes({ icon: convertIconToString(newIcon) })
      }

      const convertIconToString = icon => {
         return renderToString(icon)
      }

      // Converts stringified icons back to HTML for rendering
      const convertStringToIcon = iconString => {
         return (
            <div
               className="icon-container"
               dangerouslySetInnerHTML={{ __html: iconString }}
            />
         )
      }

      const blockProps = useBlockProps({
         className: isActive ? "active" : "",
      })
      return (
         <>
            <InspectorControls>
               <PanelBody title="Tab Options">
                  <SelectControl
                     label="Select Category"
                     value={selectedCategory || ""}
                     options={
                        categories &&
                        categories.map(t => ({
                           label: t.name,
                           value: t.slug,
                        }))
                     }
                     onChange={onChangeCategory}
                  />
                  <TextControl
                     label="Enter a Tab Name"
                     value={title || ""}
                     onChange={onChangeTitle}
                  />
                  <DropdownMenu
                     icon={convertStringToIcon(icon)}
                     text="Select an Icon"
                     label="Select an Icon"
                     className="tabs-dropdownmenu"
                     controls={[
                        {
                           title: "Academic Cap",
                           icon: academicCap,
                           onClick: () => onChangeIcon(academicCap),
                        },
                        {
                           title: "Pencil",
                           icon: pencil,
                           onClick: () => onChangeIcon(pencil),
                        },
                        {
                           title: "Paint Brush",
                           icon: paintBrush,
                           onClick: () => onChangeIcon(paintBrush),
                        },

                        {
                           title: "Information Circle",
                           icon: informationCircle,
                           onClick: () => onChangeIcon(informationCircle),
                        },
                        {
                           title: "Open Book",
                           icon: openBook,
                           onClick: () => onChangeIcon(openBook),
                        },
                        {
                           title: "Books",
                           icon: books,
                           onClick: () => onChangeIcon(books),
                        },
                        {
                           title: "Globe",
                           icon: globe,
                           onClick: () => onChangeIcon(globe),
                        },
                        {
                           title: "Certificate",
                           icon: certificate,
                           onClick: () => onChangeIcon(certificate),
                        },
                        {
                           title: "Chat Bubble",
                           icon: chatBubble,
                           onClick: () => onChangeIcon(chatBubble),
                        },
                        {
                           title: "Rectangle Group",
                           icon: rectangleGroup,
                           onClick: () => onChangeIcon(rectangleGroup),
                        },
                        {
                           title: "User Group",
                           icon: userGroup,
                           onClick: () => onChangeIcon(userGroup),
                        },
                     ]}
                  />
               </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
               {convertStringToIcon(icon)}
               <h2>{title}</h2>
            </div>
         </>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <div {...blockProps}></div>
   },
})
