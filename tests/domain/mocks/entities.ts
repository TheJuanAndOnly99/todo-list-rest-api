import { Todo } from '../../../src/domain/Todo';

export const makeFakeTodo = (): Todo =>
	new Todo({
		idCounter: 1,
		title: 'Learn TypeScript',
		text: 'Text',
		completed: false
	});
