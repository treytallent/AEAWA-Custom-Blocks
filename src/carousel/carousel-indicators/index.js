import { useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"

registerBlockType(metadata.name, {
   edit: ({ attributes: { id, isActive } }) => {
      const activeId = 2

      const indicators = [
         { id: 0, isActive: false },
         { id: 1, isActive: false },
         { id: 2, isActive: false },
         { id: 3, isActive: false },
         { id: 4, isActive: false },
      ]

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
