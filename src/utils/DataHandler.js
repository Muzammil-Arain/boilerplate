import AsyncStorage from '@react-native-async-storage/async-storage';

let store = null;
let isInternetConnected = false;
let topLoaderRef = null;
let appTheme = true;
let galleryModalRef = false;

function setAppTheme(value) {
  appTheme = value;
}

function getAppTheme() {
  return appTheme;
}

function setStore(value) {
  store = value;
}

function getStore() {
  return store;
}

function getStoreState() {
  return store?.getState() ?? {};
}

function dispatchAction(action) {
  const {dispatch} = store;
  dispatch(action);
}

function setGalleryModalRef(ref) {
  galleryModalRef = ref;
}

function setInternetConnected(connected) {
  isInternetConnected = connected;
}

function getIsInternetConnected() {
  return isInternetConnected;
}

function setTopLoaderRef(value) {
  topLoaderRef = value;
}

function getTopLoaderRef() {
  return topLoaderRef;
}
function setUserRoleStatus(val) {
  userRole = val;
}

function getUserRoleStatus() {
  return userRole;
}

function getGalleryModalRef() {
  return galleryModalRef;
}

const getFilterData = async () => {
  try {
    const filterValue = await AsyncStorage.getItem('filter');
    console.log(filterValue, 'filter');
    return filterValue ?? 0;
  } catch (error) {
    console.log(error);
  }
};
const setFilterData = async value => {
  try {
    await AsyncStorage.setItem('filter', value);
  } catch (error) {
    console.log(error);
  }
};

export default {
  setStore,
  setGalleryModalRef,
  getStore,
  setInternetConnected,
  getIsInternetConnected,
  getStoreState,
  dispatchAction,
  setTopLoaderRef,
  setUserRoleStatus,
  getUserRoleStatus,
  getTopLoaderRef,
  getGalleryModalRef,
  getFilterData,
  setFilterData,

  //currently used
  setAppTheme,
  getAppTheme,
};
