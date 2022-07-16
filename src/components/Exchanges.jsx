/* eslint-disable no-unused-vars */
import React from 'react';
import {
	Collapse, Row, Col, Typography, Avatar,
} from 'antd';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import exchanges from '../data/data.js';

const { Panel } = Collapse;
const { Text } = Typography;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Exchanges = () => {
	const exchangeData = exchanges.data.exchanges;
	console.log(exchangeData);
	return (
		<>
			<Row>
				<Col span={6}>Echanges</Col>
				<Col span={6}>24h Trade Volume</Col>
				<Col span={6}>Market</Col>
				<Col span={6}>Change</Col>
			</Row>
			<Row>
				{exchangeData.map((exchange) => (
					<Col span={24}>
						<Collapse>
							<Panel
								key={exchange.uuid}
								showArrow={false}
								header={(
									<Row key={exchange.uuid} style={{ width: '998px' }}>
										<Col span={6}>
											<Text><strong>{exchange.rank}.</strong></Text>
											<Avatar className="exchange-image" src={exchange.iconUrl} />
											<Text><strong>{exchange.name}</strong></Text>
										</Col>
										<Col span={6}>{exchange['24hVolume']}</Col>
										<Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
										<Col span={6}>{millify(exchange.price)}</Col>
									</Row>
								)}
							>
								{text}
							</Panel>
						</Collapse>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Exchanges;