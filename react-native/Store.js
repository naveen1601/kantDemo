'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistCombineReducers, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import login from './containers/loginScreen/LoginReducer';
import leadersBoard from './containers/leadersBoardScreen/LeadersBoardReducer'
import spinner from './containers/spinner/SpinnerReducer'
import quiz from './containers/quizOptionScreen/QuizReducer';
import scheduleQuiz from './containers/scheduleQuizScreen/ScheduleQuizReducer';
import scheduleLeaderBoard from './containers/scheduleLeaderBoardScreen/ScheduleLeaderBoardReducer';
import networkinfo from './containers/networkInfo/NetworkInfoReducer';


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

    let reducers = persistCombineReducers(config, { login, leadersBoard, spinner, quiz, scheduleQuiz, scheduleLeaderBoard, networkinfo});

    let store = createStore(
        reducers,
        undefined,
        applyMiddleware(thunk)
    );

    let persistor = persistStore(store, null, () => {});

    return { store, persistor };
}


let { store, persistor } = getStore();

export function getConfiguredStore() {
    return store;
}

export function getConfiguredPersistorStore() {
    return persistor;
}