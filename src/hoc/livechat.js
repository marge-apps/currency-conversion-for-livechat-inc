import { lifecycle } from 'recompose'
import liveChat from '@livechat/agent-app-widget-sdk'

export default lifecycle({
	componentWillMount: () => {
		liveChat.init()
	},
})
