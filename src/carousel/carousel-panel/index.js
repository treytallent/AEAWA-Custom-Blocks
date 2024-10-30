import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"
import { turquoise2 } from "/assets/paint-splatter.js"

registerBlockType(metadata.name, {
   edit: ({ attributes: { id, isActive }, setAttributes, clientId }) => {
      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            <div className="card-container">
               <h2 className="subheading-bold">Events</h2>
               <h3 className="h1-lg">Event Title</h3>
               <p className="body-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris faucibus lobortis leo sagittis maximus. Quisque cursus
                  lobortis ligula, id egestas nunc pretium vitae. Curabitur
                  pellentesque eu magna in dictum. In vitae consequat purus, sed
                  mollis dui. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia curae; Aenean diam neque,
                  vestibulum id tempus sit amet, pellentesque at urna. Curabitur
                  mauris purus, sollicitudin varius dui in, hendrerit finibus
                  dui. Nunc ut sodales nisl, id facilisis eros. Etiam eu tempor
                  ex. Nam mollis erat magna, vitae tempus justo cursus nec
               </p>
               <div className="wp-block-button is-style-secondary">
                  <a className="wp-block-button__link wp-element-button">
                     Read More
                  </a>
               </div>
            </div>
            <img></img>
            {turquoise2}
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <div {...blockProps}></div>
   },
})
