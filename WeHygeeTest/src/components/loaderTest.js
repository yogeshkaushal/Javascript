import Loader from 'react-native-easy-content-loader';
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
class Test extends React.Component {
    state = {
        loading: true
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 20000);
    }
    render() {
        const { loading } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.headerRow}>

                    <View style={styles.leftContent}>
                        <Loader
                            primaryColor='rgba(195, 191, 191, 1)'
                            secondaryColor='rgba(250, 250, 250, 1)'
                            animationDuration={500}
                            loading={loading}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1548600518-98810c895859?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80'
                                }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25
                                }}
                            />
                        </Loader>
                        <View>
                            <Loader loading={loading}>
                                <View style={{ height: 20, width: (30 * width) / 100, marginLeft: 15 }}>
                                    <Text>Jane Doe</Text>
                                </View>
                            </Loader>
                            <Loader loading={loading}>
                                <View style={{ height: 20, width: (30 * width) / 100, marginLeft: 15, marginTop: 10 }}>
                                    <Text style={{ color: 'grey' }}>I am Jane Doe.</Text>
                                </View>
                            </Loader>
                        </View>

                    </View>

                    <Loader loading={loading}>
                        <View style={{ height: 20, width: 100, marginRight: 15 }}>
                            <Text>01/02/19</Text>
                        </View>
                    </Loader>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 20
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default Test;

