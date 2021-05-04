import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const MainWrapper = styled.main`
  width: 95%;
  min-height: 200px;
  margin: auto;
  display: flex;
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
  width: 30%;
`

const Item = styled.div`
  background: beige;
  margin-bottom: 10px;
  min-width: 50px;
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

	const handleLike = (e) => {
		console.log("like! " + e.target.value)
	}

	const handleUnlike = (e) => {
		console.log("unlike! " + e.target.value)
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
								onClick={handleLike}
								value={element.id}
							>
								{`👍${element.likes}`}
							</Button>
							<Button
								onClick={handleUnlike}
								value={element.id}
							>{`👎${element.unlikes}`}</Button>
						</Item>
					))
					: <p>loading...</p>
				}
			</Column>
			<Column>
				<H3>To improve</H3>
				{props.boardItems
					? props.boardItems.toImprove.map(element => (
						<Item key={uuidv4()}>
							<p>{element.text}</p>
							<Button
								onClick={handleLike}
								value={element.id}
							>
								{`👍${element.likes}`}
							</Button>
							<Button
								onClick={handleUnlike}
								value={element.id}
							>{`👎${element.unlikes}`}</Button>
						</Item>
					))
					: <p>loading...</p>
				}
			</Column>
			<Column>
				<H3>Action items</H3>
				{props.boardItems
					? props.boardItems.actionItems.map(element => (
						<Item key={uuidv4()}>
							<p>{element.text}</p>
							<Button
								onClick={handleLike}
								value={element.id}
							>
								{`👍${element.likes}`}
							</Button>
							<Button
								onClick={handleUnlike}
								value={element.id}
							>{`👎${element.unlikes}`}</Button>
						</Item>
					))
					: <p>loading...</p>
				}
			</Column>
		</MainWrapper>

	)};

export default Main;