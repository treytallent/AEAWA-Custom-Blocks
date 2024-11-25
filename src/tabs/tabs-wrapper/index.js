import { registerBlockType } from "@wordpress/blocks"
import {
   InnerBlocks,
   useBlockProps,
   InspectorControls,
} from "@wordpress/block-editor"
import { SelectControl, PanelBody } from "@wordpress/components"
import { useSelect } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import "./editor.scss"
import "./style.scss"
import metadata from "./block.json"

const blocktemplate = [["aeawa-blocks/tabs-list"], ["aeawa-blocks/panels-list"]]

registerBlockType(metadata.name, {
   edit: ({ attributes: { activeId }, setAttributes }) => {
      // Triggers a re-render when a tab block is selected
      // Returns the selected tab block
      const newActiveId = useSelect(select => {
         const block = select("core/block-editor").getSelectedBlock()
         if (block && block.name === "aeawa-blocks/tab") {
            return block.attributes.id
         }
         return null
      }, [])

      // When the newActiveId value changes the attribute of activeId is updated
      useEffect(() => {
         if (newActiveId !== null && newActiveId !== activeId) {
            setAttributes({ activeId: newActiveId })
         }
      }, [newActiveId])

      const blockProps = useBlockProps()
      return (
         <>
            <InspectorControls>
               <PanelBody title="Tabs Options"></PanelBody>
            </InspectorControls>
            <section {...blockProps}>
               <InnerBlocks
                  template={blocktemplate}
                  orientation="vertical"
                  renderAppender={false}
               />
            </section>
         </>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return (
         <section {...blockProps}>
            <InnerBlocks.Content />
         </section>
      )
   },
})
