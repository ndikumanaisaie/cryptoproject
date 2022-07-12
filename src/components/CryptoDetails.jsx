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

import { useGetCryptosDetailsQuery } from '../services/cryptoApi.js';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState('7d');
	const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
	const cryptoDetails = data?.data?.coin;

	console.log(cryptoDetails);

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
		<div>CryptoDetails {coinId}</div>
	);
};

export default CryptoDetails;