import React from 'react'

import PanelRenderer from 'beinformed-ui/Panel/PanelRenderer'

import type { Props } from 'beinformed-ui/Panel/PanelRenderer'

import MindmapButton from '../Frontpage/MindmapButtonOverlay'
import ProbleemConceptmapButton from '../Frontpage/ProbleemConceptmapButtonOverlay'

const MindmapPanel = (props: Props) => {         

if (props.panel !== null && props.panel !== undefined) {
     if (props.panel.layouthint.has('mindmap')) {
         return <div><MindmapButton />
            <ProbleemConceptmapButton /></div>
     }
    return <PanelRenderer panel={props.panel} />
            
}

return null

}

MindmapPanel.displayName = 'Tutorial.MindmapPanel'

export default MindmapPanel 




