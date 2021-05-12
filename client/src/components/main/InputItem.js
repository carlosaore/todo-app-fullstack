import styled from 'styled-components';

const Form = styled.form`
`

const InputItem = (props) => {

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const data = {
			column: props.column,
			text: props.newItemValue
		}

		fetch(`/api/board/${props.column}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.catch(error => console.error(error))
		.then(props.getData());
	};


	return (
		<Form onSubmit={handleOnSubmit}>
			<label>
				...
				<input type="text" value={props.newItemValue} onChange={props.handleOnChange}/>
			</label>
			<input type="submit" />
		</Form>
	)
};

export default InputItem;