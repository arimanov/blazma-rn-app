import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Icon from '../components/Icon';
import {screens} from '../utils/constants';
import useAuthData from '../hooks/useAuthData';
import colors from '../utils/appColors';
import {authUserAction, clearLoginErrorAction} from '../redux/actions';
import {
  loginErrorSelector,
  loginStatusSelector,
  userDataSelector,
  statusRequestSelector,
} from '../redux/selectors';
import {APP_VERSION} from '@env';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errorMessage = useSelector(loginErrorSelector);
  const isLoading = useSelector(loginStatusSelector);
  const isLoadingStatus = useSelector(statusRequestSelector);
  const {userName, userToken} = useSelector(userDataSelector);
  const {setUserData} = useAuthData();

  const [loginValue, setLoginValue] = useState('');

  useEffect(() => {
    if (userName && userToken) {
      setUserData({userName, userToken});
      navigation.navigate(screens.CHAT);
    }
  }, [userName, userToken]);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Error', errorMessage, [
        {text: 'Close', onPress: () => dispatch(clearLoginErrorAction())},
      ]);
    }
  }, [errorMessage]);

  const onPressSubmit = () => {
    Keyboard.dismiss();
    dispatch(authUserAction(loginValue));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {isLoadingStatus ? (
          <View style={styles.loadView}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <Image
          style={styles.logo}
          source={require('../assets/blazma-logo.png')}
        />
        <View style={styles.formBlock}>
          <Input
            editable={!isLoading}
            onChange={setLoginValue}
            placeholder="Your name"
          />
          {isLoading ? (
            <ActivityIndicator size="large" style={styles.spin} />
          ) : (
            <Button onPress={onPressSubmit} title={'Join to chat'} />
          )}
          <View style={styles.separator} />
        </View>
        <View style={styles.bottom}>
          <Icon
            name="git-branch-outline"
            size={16}
            color={colors.grayGeneral}
          />
          <Text style={styles.secondText}>App version: {APP_VERSION}</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGeneral,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.semitransparent,
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  logo: {
    marginTop: 50,
    height: 200,
    width: 200,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  formBlock: {
    flex: 1,
    width: '70%',
    height: '30%',
    paddingTop: 60,
  },
  separator: {
    height: 40,
  },
  spin: {
    marginTop: 10,
  },
  secondText: {
    marginLeft: 5,
    color: colors.grayGeneral,
  },
});
