export type TodoProps = {
	idCounter: number;
	title: string;
	text: string;
	completed: boolean;
};

export class Todo {
	public readonly idCounter: number;

	public title: string;

	public text: string;

	public completed: boolean;

	constructor(props: TodoProps) {
		this.idCounter = props.idCounter;
		this.title = props.title;
		this.text = props.text;
		this.completed = props.completed || false;
	}
}
