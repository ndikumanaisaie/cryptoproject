/* eslint-disable no-unused-vars */
import React from 'react';
import {
	Button, Menu, Typography, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined, MoneyCollectionOutlined, BulbOutlined, FundOutlined, MenuOutlined,
} from '@ant-design/icons';

import Icon from '../images/cryptocurrency.png';

const Navbar = () => {
	const { Title } = Typography;
	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={Icon} size="large" />
				<Title level={2} className="logo">
					<Link to="/"> Cryptoverse </Link>
				</Title>
			</div>
		</div>
	);
};

export default Navbar;