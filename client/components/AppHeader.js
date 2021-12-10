import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Pressable, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default () => {

    const navigation = useNavigation();
    const drawerOpenState = IsDrawerOpen(navigation);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => setIsDrawerOpen(drawerOpenState), [drawerOpenState]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonWrapper}>
                <Pressable
                    style={({ pressed }) => [pressed ? styles.buttonPressedIn : styles.buttonPressedOut, styles.button]}
                    onPress={ () => navigation.toggleDrawer() }
                >
                    <Ionicons
                        name={isDrawerOpen ? "chevron-back-circle" : "chevron-forward-circle"}
                        size={25} style={styles.icon}
                    />
                </Pressable>
            </View>
            <View style={styles.logoWrapper}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
            </View>
        </SafeAreaView>
    )
}

const IsDrawerOpen = (navigation) =>
    !!navigation.getState().history.find((el) => el.type === 'drawer' && el.status === 'open');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F8FA',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonWrapper: {
        alignItems: 'center',
        width: '20%',
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 50
    },
    buttonPressedIn: {
        backgroundColor: '#2F3046FF',
    },
    buttonPressedOut: {
        backgroundColor: '#f1eaea',
    },
    icon: {
        marginLeft: 8,
        color: '#5D7CF3',
    },
    logoWrapper: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    logo: {
        width: 177,
        height: 30,
    }
});