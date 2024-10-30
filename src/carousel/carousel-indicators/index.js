import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes: { id, isActive, indicators } }) => {
      const activeId = 1

      const blockProps = useBlockProps()
      return (
         <div {...blockProps}>
            {indicators.map(i => (
               <button
                  key={i.id}
                  data-id={i.id}
                  className={`${i.id === activeId ? `active` : ``}`}
               ></button>
            ))}
         </div>
      )
   },
   save: () => {
      const blockProps = useBlockProps.save()
      return <div {...blockProps}></div>
   },
})
