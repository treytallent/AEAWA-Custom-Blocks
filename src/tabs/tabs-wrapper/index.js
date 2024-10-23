import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import {
   InnerBlocks,
   useBlockProps,
   InspectorControls,
} from "@wordpress/block-editor"
import {
   CheckboxControl,
   RadioControl,
   TextControl,
   ToggleControl,
   SelectControl,
   PanelBody,
} from "@wordpress/components"

import { select, useSelect } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
import "./style.css"
import "./editor.css"
import metadata from "./block.json"

const blocktemplate = [
   ["artedwa-blocks/tabs-list"],
   ["artedwa-blocks/panels-list"],
]

registerBlockType(metadata.name, {
   edit: ({ attributes, setAttributes, clientId }) => {
      const {
         activeId,
         taxonomies,
         selectedTaxonomy,
         selectedTaxonomyCategories,
      } = attributes
      // console.log("rendering tabs wrapper")

      // Triggers a re-render when a tab block is selected
      // Returns the selected tab block
      const newActiveId = useSelect(select => {
         const block = select("core/block-editor").getSelectedBlock()
         if (block && block.name === "artedwa-blocks/tab") {
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

      // Returns taxonomy information after first mount
      const taxonomiesFetch = useSelect(
         select => {
            return select("core").getTaxonomies()
         },
         [clientId]
      )

      // Runs when the value of taxonomies changes
      useEffect(() => {
         if (taxonomiesFetch === null) return
         const acfTaxonomies = taxonomiesFetch.filter(
            i => i.rest_base === "acf-taxonomy"
         )
         const acfTaxonomyNameSlugs = acfTaxonomies.map(t => ({
            name: t.name,
            slug: t.slug,
         }))
         setAttributes({ taxonomies: acfTaxonomyNameSlugs })
      }, [taxonomiesFetch])

      // Sets selectedTaxonomyCategories
      useEffect(() => {
         if (selectedTaxonomy != "Please select") {
            apiFetch({ path: "/wp/v2/acf-taxonomy" })
               .then(fetchedTerms => {
                  const termNames = fetchedTerms.map(t => ({
                     name: t.name,
                     slug: t.slug,
                  }))
                  setAttributes({ selectedTaxonomyCategories: termNames })
               })
               .catch(error => {
                  console.error("Error fetching terms:", error)
               })
         }
      }, [selectedTaxonomy])

      function onChangeTaxonomy(selectedTaxonomy) {
         setAttributes({ selectedTaxonomy: selectedTaxonomy })
      }

      const blockProps = useBlockProps()
      return (
         <>
            <InspectorControls>
               <PanelBody title="Tabs Options">
                  <SelectControl
                     label="Select Control"
                     value={selectedTaxonomy || "Please select"}
                     options={[
                        { label: "Please select", value: "" },
                        ...(taxonomies
                           ? taxonomies.map(t => ({
                                label: t.name,
                                value: t.slug,
                             }))
                           : []),
                     ]}
                     onChange={onChangeTaxonomy}
                  />
               </PanelBody>
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
