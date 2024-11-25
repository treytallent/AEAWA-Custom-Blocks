import { registerBlockType } from "@wordpress/blocks"
import {
   InnerBlocks,
   useBlockProps,
   InspectorControls,
} from "@wordpress/block-editor"
import { TextControl, PanelBody } from "@wordpress/components"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes: { linkUrl }, setAttributes }) => {
      const blockProps = useBlockProps()

      function handleLinkUrl(value) {
         setAttributes({ linkUrl: value })
      }

      return (
         <>
            <InspectorControls>
               <PanelBody title="Link Wrapper Options">
                  <TextControl
                     label="Link URL"
                     value={linkUrl}
                     onChange={handleLinkUrl}
                  />
               </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
               <InnerBlocks />
            </div>
         </>
      )
   },

   save: ({ attributes: { linkUrl } }) => {
      const blockProps = useBlockProps.save()

      const props = { ...blockProps, href: linkUrl }

      return (
         <a {...props}>
            <InnerBlocks.Content />
         </a>
      )
   },
})
