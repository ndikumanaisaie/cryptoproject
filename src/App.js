/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import styles from './App.css';

import {
	Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News,
} from './components';

const App = () => (
	<div className="app">
		<div className="navbar">
			<Navbar />
		</div>
		<div className="main">
			<Layout>
				<div className="routes">
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route path='/exchanges' element={<Exchanges />} />
						<Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
						<Route path='/crypto/:coinId' element={<CryptoDetails />} />
						<Route path='/news' element={<News />} />
					</Routes>
				</div>
			</Layout>
		</div>
		<div className="footer">

		</div>
	</div>
);

export default App;
