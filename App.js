import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button} from 'react-native';
import FlatlistExample from "./src/components/FlatlistExample";

export default class App extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatlistExample />
            </SafeAreaView>
    );
    }
    }
    const styles = StyleSheet.create({
        container: {
        backgroundColor: 'white',
        flex: 1,
    },

    });


