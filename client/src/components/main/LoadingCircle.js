import styled from 'styled-components';

const LoadingDiv = styled.div`
	color: rgba(0, 0, 0, 0);
	border-radius: 50%;
	width: 30px;
	height: 30px;
	margin: 20% auto;
	font-size: 10px;
	position: relative;
	border-top: 0.5em solid rgba(0, 0, 0, 0.2);
	border-right: 0.5em solid rgba(0, 0, 0, 0.2);
	border-bottom: 0.5em solid rgba(0, 0, 0, 0.22);
	border-left: 0.5em solid rgba(0, 0, 0, 1);
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	-webkit-animation: loading 0.6s infinite linear;
	animation: loading 0.6s infinite linear;
  
	@-webkit-keyframes loading8 {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		  
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
  
	@keyframes loading {
		0% {
		  -webkit-transform: rotate(0deg);
		  transform: rotate(0deg);
		}
	  
		100% {
		  -webkit-transform: rotate(360deg);
		  transform: rotate(360deg);
		}
	}
  	
  	:after {
		border-radius: 50%;
		width: 30px;
		height: 30px;
	}
`

const LoadingCircle = () => {
	return (
		<LoadingDiv>
			Loading
		</LoadingDiv>
	)
}



export default LoadingCircle;