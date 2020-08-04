'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistCombineReducers, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import login from './containers/loginScreen/LoginReducer';
import leadersBoard from './containers/leadersBoardScreen/LeadersBoardReducer'

const oldConfig = {
    storage: AsyncStorage
};
function getStore() {
    let config = {
        key: 'root',
        storage: AsyncStorage,
        debug: false,
        version: 0,
        stateReconciler: autoMergeLevel2,
        //migrate: createMigrate(Migrations), //need to put migration script
        getStoredState: getStoredStateMigrateV4(oldConfig)
    };

    let reducers = persistCombineReducers(config, { login, leadersBoard });

    let store = createStore(
        reducers,
        undefined,
        applyMiddleware(thunk)
    );

    let persistor = persistStore(store, null, () => {});

    return { store, persistor };
}

//Crashlytics.log('Store - creating store ');
let { store, persistor } = getStore();
//Crashlytics.log('Store - done creating store ');

export function getConfiguredStore() {
    return store;
}

export function getConfiguredPersistorStore() {
    return persistor;
}