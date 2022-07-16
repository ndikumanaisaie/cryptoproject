/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
	Card, Row, Col, Input,
} from 'antd';
import Loader from './Loader.jsx';
import { useGetCryptosQuery } from '../services/cryptoApi.js';

const CryptoCurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 50;
	const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const filteredData = cryptoList?.data?.coins
			.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
		setCryptos(filteredData);
	}, [cryptoList, searchTerm]);

	if (isFetching) return <Loader />;

	return (
		<>
			{
				!simplified && (
					<div className="search-crypto">
						<Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
					</div>
				)
			}
			<Row gutter={[32, 32]} className="crypto-card-container">
				{
					cryptos?.map((coin) => (
						<Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
							<Link to={`/crypto/${coin.uuid}`}>
								<Card
									title={`${coin.rank}.${coin.name}`}
									extra={<img className="crypto-image" src={coin.iconUrl} alt="coin"/>}
									hoverable
								>
									<p>Price: {millify(coin.price)} </p>
									<p>Market Cap: {millify(coin.price)} </p>
									<p>Daily Change: {millify(coin.price)} </p>
								</Card>
							</Link>
						</Col>
					))
				}
			</Row>
		</>
	);
};

export default CryptoCurrencies;