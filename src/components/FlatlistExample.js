import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import axios from 'axios';

const isIos = Platform.OS === 'ios';

export default class FlatlistExample extends Component {
    state = {
        text: '',
        page:1,
        contacts: [],
        allContacts: {},
        loading:true,
        refreshing: false
    };

    constructor(props) {
        super(props);
        this.duringMomentum= false;
    }

    componentDidMount() {
        this.getContacts();
    };

    getContacts = async () => {
        this.setState({
           loading:true,
        });
        const {data: {results: contacts}} = await axios.get(`https://randomuser.me/api/?results=10&page=${this.state.page}`);
        const users = [...this.state.contacts, ...contacts];

        if(this.state.refreshing) {
            users.reverse();
        }

        this.setState({
            contacts:users,
            allContacts: users,
            loading:false,
            refreshing: false,
        });
    };
    loadMore = () => {
    if(!this.duringMomentum){
        this.setState({
            page:this.state.page +1,
        },() =>{
            this.getContacts();
        });
        this.duringMomentum = false;
    }
    };
    onRefresh = () => {
        this.setState({
            page:1,
            refreshing:true,
        }, () => {
            this.getContacts();
        })
    }
    renderConctactsItem = ({item, index}) => {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                flex: 1,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: 'black',
                backgroundColor: index % 2 === 1 ? '#fafafa' : ''
            }}>
                <Image
                    style={styles.avatar}
                    source={{uri: item.picture.thumbnail}}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                    <Text>{item.location.state}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    searchFilter = text => {
        const newData = this.state.allContacts.filter(item => {
            const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}s`;

            return listItem.indexOf(text.toLowerCase()) > -1;
        });
        this.setState({
            contacts: newData,
        });
    };
    headerRender = () => {
        const {text} = this.state;
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    onFocus={()=> this.duringMomentum =true}
                    onBlur={()=> this.duringMomentum =false}
                    onChangeText={text => {
                        this.setState({
                            text,
                        });
                        this.searchFilter(text);
                    }}
                    value={text}
                    placeholder='Search..'
                    style={styles.searchInput}/>
            </View>
        )
    };
    renderFooter = () => {
        if(!this.state.loading) return null;
        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    };
    render() {
        return (
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    ListHeaderComponent={this.headerRender()}
                    renderItem={this.renderConctactsItem}
                    keyExtractor={(item) => item.login.uuid}
                    data={this.state.contacts}

                    onEndReached = {this.loadMore}
                    onEndReachedThreshold={isIos ? 0 : .2}
                    onMomentumScrollBegin={() => {this.duringMomentum = false}}

                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
        );
    }
}
const styles = StyleSheet.create({
    avatar: {
        marginHorizontal: 10,
        borderRadius: 25,
        width: 50,
        height: 50
    },
    textContainer: {
        justifyContent: 'space-around',
    },
    name: {
        fontSize: 16,
    },
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        fontSize: 16
    },
});


