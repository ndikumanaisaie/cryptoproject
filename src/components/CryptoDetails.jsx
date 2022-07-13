/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import {
	Col, Row, Typography, Select,
} from 'antd';

import {
	MoneyCollectOutlined, DollarCircleOutlined, NumberOutlined, ThunderboltOutlined,
	FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined,
} from '@ant-design/icons';

import LineChat from './LineChat.jsx';

import { useGetCryptosDetailsQuery, useGetCryptosHistoryQuery } from '../services/cryptoApi.js';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState('7d');
	const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
	const { data: coiHistory } = useGetCryptosHistoryQuery(coinId, timePeriod);

	const cryptoDetails = data?.data?.coin;

	const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

	const stats = [
		{ title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
		{ title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
		{ title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
		{ title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
		{ title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
	];

	const genericStats = [
		{ title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
		{ title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
		{ title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
		{ title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
		{ title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
	];

	if (isFetching) return 'Loading...';

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Title level={2} className="coin-name">
					{cryptoDetails.name} ({cryptoDetails.symbol}) Price
				</Title>
				<p>
					{cryptoDetails.name} Live Price in US dollar.
          View value statistics, Supply and market cap
				</p>
				<Select
					defaultValue="7d"
					className="select-timeperiod"
					onChange={(value) => setTimePeriod(value)}
				>
					{
						time.map((date) => <Option key={date}>{date}</Option>)
					}
				</Select>
				<LineChat
					historyData={coiHistory}
					currentPrice={cryptoDetails.price}
					coinName={cryptoDetails.name}
				/>

				<Col className="stats-container">
					<Col className="coin-value-statistics">
						<Col className="coin-value-statistics-heading">
							<Title level={3} className="coin-detail-heading">
								{cryptoDetails.name} Value Statistics
							</Title>
							<p>
                An overview showing the stats of {cryptoDetails.name}
							</p>
						</Col>
						{
							stats.map(({ icon, title, value }) => (
								<Col className="coin-stats">
									<Col className="coin-stats-name">
										<Text>{icon}</Text>
										<Text>{title}</Text>
									</Col>
									<Text className="stats">{value}</Text>
								</Col>
							))
						}
					</Col>
					<Col className="other-stats-info">
						<Col className="coin-value-statistics-heading">
							<Title level={3} className="coin-detail-heading">
								Other Statistics
							</Title>
							<p>
                An overview showing the stats of all cryptocurrencies
							</p>
						</Col>
						{
							genericStats.map(({ icon, title, value }) => (
								<Col className="coin-stats">
									<Col className="coin-stats-name">
										<Text>{icon}</Text>
										<Text>{title}</Text>
									</Col>
									<Text className="stats">{value}</Text>
								</Col>
							))
						}
					</Col>
				</Col>
				<Col className="coin-desc-link">
					<Row className="coin-desc">
						<Title level={3} className="coin-detail-heading">
							{HTMLReactParser(cryptoDetails.description)}
						</Title>
					</Row>
					<Col className="coin-links">
						<Title level={3} className="coin-details">
							{cryptoDetails.name} Links
						</Title>
						{
							cryptoDetails.links.map((link) => (
								<Row className="coin-link" key={link.name}>
									<Title level={5} className="link-name">
										{link.type}
									</Title>
									<a href={link.url} target="_blank" rel="noreferrer">
										{link.name}
									</a>
								</Row>
							))
						}
					</Col>
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;