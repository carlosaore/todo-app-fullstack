import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import LoadingCircle from './LoadingCircle';
import InputItem from "./InputItem";

const MainWrapper = styled.main`
  width: 95%;
  min-height: 200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.mediumViewport}) {
    width: 85%;
  }

  @media (min-width: ${props => props.theme.largeViewport}) {
    width: 80%;
    max-width: 1000px;
  }
`

const Column = styled.section`
  width: 100%;

  @media (min-width: ${props => props.theme.mediumViewport}) {
    width: 30%;
  }
`

const Item = styled.div`
  background: beige;
  margin-bottom: 10px;
  font-size: 12px;
`

const H3 = styled.h3`
  color: darkblue;
  text-align: center;
`

const Button = styled.button`
  border: none;
  background: none;
`

const Main = (props) => {
	// States
	const [wentWellNewItem, setWentWellNewItem] = useState("");
	const [toImproveNewItem, setToImproveNewItem] = useState("");
	const [actionItemsNewItem, setActionItemsNewItem] = useState("");

	// onChange handlers
	const handleChangeWentWellNewItem = (e) => {
		setWentWellNewItem(e.target.value)
	};

	const handleChangeToImproveNewItem = (e) => {
		setToImproveNewItem(e.target.value)
	};

	const handleChangeActionItems = (e) => {
		setActionItemsNewItem(e.target.value)
	};

	// Where do we to our API reqs? Here or in the comp?

	const handleLike = (column, id) => {

		const data = {
			column : column,
			id : id
		}

		fetch(`/api/board/like`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(error => console.error(error))
			.then(props.getData());
	}

	const handleUnlike = (column, id) => {

		const data = {
			column : column,
			id : id
		}

		fetch(`/api/board/unlike`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(error => console.error(error))
			.then(props.getData());
	}

	return (
		<MainWrapper>
			<Column>
				<H3>Went well</H3>
				{props.boardItems
					? props.boardItems.wentWell.map(element => (
						<Item key={uuidv4()}>
							<p>{element.text}</p>
							<Button
								onClick={() => handleLike( 'went_well', element.idwent_well)}
							>
								{`👍${element.likes}`}
							</Button>
							<Button
								onClick={() => handleUnlike('went_well', element.idwent_well)}
							>{`👎${element.unlikes}`}</Button>
						</Item>
					))

					: <LoadingCircle />
				}
				<Item>
					<InputItem
						column={"went_well"}
						newItemValue={wentWellNewItem}
						handleOnChange={handleChangeWentWellNewItem}
						getData={props.getData}
						setNewItemValue={setWentWellNewItem}
					/>
				</Item>
			</Column>
			<Column>
				<H3>To improve</H3>
				{props.boardItems
					? props.boardItems.toImprove.map(element => (
						<Item key={uuidv4()}>
							<p>{element.text}</p>
							<Button
								onClick={() => handleLike( 'to_improve', element.idto_improve)}
								value={element}
							>
								{`👍${element.likes}`}
							</Button>
							<Button
								onClick={() => handleUnlike( 'to_improve', element.idto_improve)}
								value={element}

							>{`👎${element.unlikes}`}</Button>
						</Item>
					))
					: <LoadingCircle />
				}
				<Item>
					<InputItem
						column={"to_improve"}
						newItemValue={toImproveNewItem}
						handleOnChange={handleChangeToImproveNewItem}
						getData={props.getData}
						setNewItemValue={setToImproveNewItem}
					/>
				</Item>
			</Column>
			<Column>
				<H3>Action items</H3>
				{props.boardItems
					? props.boardItems.actionItems.map(element => (
						<Item key={uuidv4()}>
							<p>{element.text}</p>
							<Button
								onClick={() => handleLike( 'action_items', element.idaction_items)}
								value={element}
							>
								{`👍${element.likes}`}
							</Button>
							<Button
								onClick={() => handleUnlike( 'action_items', element.idaction_items)}
								value={element}
							>{`👎${element.unlikes}`}</Button>
						</Item>
					))
					: <LoadingCircle />
				}
				<Item>
					<InputItem
						column={"action_items"}
						newItemValue={actionItemsNewItem}
						handleOnChange={handleChangeActionItems}
						getData={props.getData}
						setNewItemValue={setActionItemsNewItem}
					/>
				</Item>
			</Column>
		</MainWrapper>

	)};

export default Main;