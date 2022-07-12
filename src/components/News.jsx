/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
	Select, Typography, Row, Col, Avatar, Card,
} from 'antd';
import moment from 'moment';

import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi.js';
import { useGetCryptosQuery } from '../services/cryptoApi.js';

const { Text, Title } = Typography;
const { option } = Select;

const demoImge = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('');
	const {
		data: cryptoNews, isFetching,
	} = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
	const { data: cryptoList } = useGetCryptosQuery(100);

	if (isFetching) return 'Loading';

	return (
		<Row gutter={[24, 24]}>
			{
				!simplified && (
					<Col span={24}>
						<Select
							showSearch
							className="selet-news"
							placeholder="Select a Crypto"
							optionFilterProp="children"
							onChange={(value) => setNewsCategory(value)}
							filterOption={
								(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())
							}
						>
							<Option value="Cryptocurrency">Cryptocurrency</Option>
							{
								cryptoList?.data?.coins
									.map((coin) => <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>)
							}

						</Select>
					</Col>
				)
			}
			{
				cryptoNews.value.map((news, i) => (
					<Col xs={24} sm={12} lg={8} key={i}>
						<Card hoverable className="news-card">
							<a href={news.url} target="_blank" rel="noreferrer">
								<div className="news-image-container">
									<Title className="news-title" level={4}>
										{news.name}
									</Title>
									<img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImge} alt={news.name}/>
								</div>
								<p>
									{
										news.description > 100
											? `${news.description.substring(0, 100)} ...`
											: news.description
									}
								</p>
								<div className="provider-container">
									<div>
										<Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImge} alt="news" />
										<Text className="provider-name">{news.provider[0]?.name}</Text>
									</div>
									<Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
								</div>
							</a>
						</Card>
					</Col>
				))
			}
		</Row>
	);
};

export default News;