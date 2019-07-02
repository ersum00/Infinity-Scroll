/*
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button} from 'react-native';
import FlatlistExample from './src/components/FlatlistExample';
import PlatformExample from './src/components/PlatformExample';
import axios from 'axios';

export default class App extends Component {
    state = {
        name: '',
        surname: '',
        loading: true,
    };

    componentDidMount() {
        this.getRandomUser();
    }

    getRandomUser = async () => {
        this.setState({
            loading: true,
        });
        const {data: {results}} = await axios.get('https://randomuser.me/api');
        const {name: {first, last}} = results[0];
        this.setState({
            name:first,
            surname: last,
            loading: false,
        });
    };

    render() {
        const {name, surname, loading} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    {
                        loading ? <Text style={[styles.text, {paddingBottom: 10}]}>Loading...</Text> :
                            <Text style={[styles.text, {paddingBottom: 10}]}>{name} {surname}</Text>
                    }

                    <Button
                        title={"Random User"}
                        onPress={this.getRandomUser}
                    />
                </View>
                {/!* <FlatlistExample />*!/}
                {/!*<PlatformExample />*!/}
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center'
    }
});


*/
