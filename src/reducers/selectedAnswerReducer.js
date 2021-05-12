export default function selectedAnswerReducer(state = [], action){
	console.log("IM INREDUCER",state)
	switch (action.type){
		case 'ANSWER_QUESTION':
			return Object.assign({}, state, {bgClass:action.answer})
		default:
				return state;
	}
}