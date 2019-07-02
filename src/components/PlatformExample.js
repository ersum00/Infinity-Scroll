import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';

export default class PlatformExample extends Component {
render(){
    const headerStyle = Platform.select({
        ios:styles.IOSHeader,
        android:styles.ANDHeader
    });
    return(
        <View style={headerStyle}>
            <Text>Header</Text>
        </View>
    );
}
}
const styles = StyleSheet.create({
    IOSHeader:{
    backgroundColor:'red',
    padding:20
    },
    ANDHeader: {
        backgroundColor: 'blue',
        padding: 30
    }
});