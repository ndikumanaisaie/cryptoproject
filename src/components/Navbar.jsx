/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
	Button, Menu, Typography, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined,
} from '@ant-design/icons';

import Icon from '../images/cryptocurrency.png';

const { Title } = Typography;

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

	const handleResize = () => setScreenSize(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={Icon} size="large" />
				<Title level={2} className="logo">
					<Link to="/"> Cryptoverse </Link>
				</Title>
				<Button
					className="menu-control-container"
					onClick={() => setActiveMenu(!activeMenu)}
				>
					<MenuOutlined />
				</Button>
			</div>
			{
				activeMenu && (
					<Menu theme="dark">
						<Menu.Item icon={<HomeOutlined />}>
							<Link to="/">Home</Link>
						</Menu.Item>
						<Menu.Item icon={<FundOutlined />}>
							<Link to="/Cryptocurrencies">Cryptocurrencies</Link>
						</Menu.Item>
						<Menu.Item icon={<MoneyCollectOutlined />}>
							<Link to="/Exchanges">Exchanges</Link>
						</Menu.Item>
						<Menu.Item icon={<BulbOutlined />}>
							<Link to="/News">News</Link>
						</Menu.Item>
					</Menu>
				)
			}
		</div>
	);
};

export default Navbar;