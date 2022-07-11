/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
	Card, Row, Col, Input,
} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi.js';

const CryptoCurrencies = () => {
	const { data: cryptoList, isFetching } = useGetCryptosQuery();
	const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

	console.log(cryptos);

	return (
		<>
			<Row gutter={[32, 32]} className="crypto-card-container">
				{
					cryptos.map((coin) => (
						<Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
							<Link to={`/crypto/${coin.id}`}>
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