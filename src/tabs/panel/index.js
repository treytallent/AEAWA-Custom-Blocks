import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import { select, useSelect } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["core/paragraph", { placeholder: "Modify tab content" }],
]

registerBlockType(metadata.name, {
   edit: ({ clientId, attributes, setAttributes }) => {
      const { id, selectedCategory, isActive } = attributes

      // Triggers a re-render when a new activeId or category value is set
      // Returns the attribute activeId from the parent tabs-wrapper
      const { activeTabId, category } = useSelect(select => {
         const parentBlockId =
            select("core/block-editor").getBlockHierarchyRootClientId(clientId)
         const parentAttr =
            select("core/block-editor").getBlockAttributes(parentBlockId)
         const tabsWrapperBlocks =
            select("core/block-editor").getBlocks(parentBlockId)
         const tabsListClientId = tabsWrapperBlocks[0].clientId
         // Get the children blocks of tabs-list and panels-list
         const tabsListChildren =
            select("core/block-editor").getBlocks(tabsListClientId)
         // Find the corresponding tab for each panel
         const matchingTab = tabsListChildren.find(
            tab => tab.attributes.id === id
         )
         return {
            activeTabId: parentAttr.activeId,
            category: matchingTab.attributes.selectedCategory,
         }
      }, [])

      useEffect(() => {
         setAttributes({ selectedCategory: category })
      }, [category])

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
      }, [clientId])

      const blockProps = useBlockProps({
         className: isActive ? "active" : "",
      })
      return (
         <div {...blockProps}>
            <InnerBlocks template={blocktemplate} orientation="vertical" />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
