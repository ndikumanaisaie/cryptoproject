/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChat = (coinHistory, currentPrice, coinName) => {
	const coinPrice = [];
	const coinTimestamp = [];

	for (let i = 0; i < coinHistory?.data.history?.length; i += 1) {
		coinPrice.push(coinHistory.data.history[i].price);
		coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString);
	}

	const data = {
		labels: [
			{
				label: 'Price in USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<>
			<Row className="chart-heading">
				<Title level={2} className="chart-title" >
					{coinName} Price Charts
				</Title>
				<Col className="price-container">
					<Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
					<Title level={5} className="current-price"> Current {coinName} Price: ${currentPrice}</Title>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	);
};

export default LineChat;