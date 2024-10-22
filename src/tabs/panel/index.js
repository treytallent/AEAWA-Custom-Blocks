import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"
import { select } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["core/paragraph", { placeholder: "Modify tab content" }],
]

registerBlockType(metadata.name, {
   edit: ({ clientId, attributes, setAttributes }) => {
      const { id, category } = attributes

      const panelsListClientId =
         select("core/block-editor").getBlockRootClientId(clientId)

      const tabsWrapperClientId =
         select("core/block-editor").getBlockRootClientId(panelsListClientId)

      const activeId =
         select("core/block-editor").getBlockAttributes(
            tabsWrapperClientId
         ).activeId

      let isActive = id === activeId

      function setCategory() {
         // Get the client IDs of the tabs-list and panels-list blocks
         const tabsWrapperBlocks =
            select("core/block-editor").getBlocks(tabsWrapperClientId)
         const tabsListClientId = tabsWrapperBlocks[0].clientId

         // Get the children blocks of tabs-list and panels-list
         const tabsListChildren =
            select("core/block-editor").getBlocks(tabsListClientId)
         const panelsListChildren =
            select("core/block-editor").getBlocks(panelsListClientId)

         // Find the corresponding tab for each panel
         const matchingTab = tabsListChildren.find(
            tab => tab.attributes.id === id
         )
         setAttributes({ category: matchingTab.attributes.title })
      }

      // Sets the attribute id equal to the index value of a panel within it's parent panels-list
      useEffect(() => {
         if (!id === undefined) return
         const indexValue = wp.data
            .select("core/block-editor")
            .getBlockIndex(clientId, ["artedwa-blocks/tab"])
         setAttributes({ id: indexValue })

         if (!category === undefined) return
         setCategory()
      }, [clientId])

      const blockProps = useBlockProps()
      return (
         <div {...blockProps} className={isActive ? "active" : ""}>
            <p>{category}</p>
            <InnerBlocks template={blocktemplate} orientation="vertical" />
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <InnerBlocks.Content {...blockProps} />
   },
})
