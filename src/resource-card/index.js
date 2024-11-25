import { __ } from "@wordpress/i18n"
import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps } from "@wordpress/block-editor"
import { select } from "@wordpress/data"
import { useEffect } from "@wordpress/element"
import metadata from "./block.json"
import "./style.scss"

// get the parent panel and return it's attribute of "category"
// set it's category attribute to the acf card too

registerBlockType(metadata.name, {
   edit: ({ clientId, setAttributes, attributes }) => {
      const { category } = attributes
      const blockProps = useBlockProps()

      return (
         <div {...blockProps}>
            <img></img>
            <div className="card-container">
               <h3 className="has-26-36-s-font-size">Resource Title</h3>
               <p>Short event description</p>
               <div className="wp-block-button is-style-secondary card-button-end">
                  <a className="wp-block-button__link wp-element-button">
                     Read More
                  </a>
               </div>
            </div>
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <div {...blockProps}></div>
   },
})
