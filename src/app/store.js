/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi.js';

export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
	},
});