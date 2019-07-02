import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { Transition }
    from 'react-navigation-fluid-transitions'

const LogoImage = (props) => (
    <Image source={{ uri: 'https://picsum.photos/100/100?image=56' }} style={props.style} />
);

export default class Screen2 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Transition shared='logo' appear='horizontal'>
                    <LogoImage style={styles.smallLogo} />
                </Transition>
                <Transition appear='flip'>
                    <Text style={styles.paragraph}>
                        <Text style={{ fontWeight: 'normal' }}>
                            Now you should have a basic understanding of how this app works.
                            Please sign up and take part in this fantastic user experience!
                    </Text>
                    </Text>
                </Transition>
                <Transition appear='horizontal'>
                <Text style={styles.paragraph}>
                    This is the last page of the onboarding.
                </Text>
                </Transition>
                <Button title="Back" onPress={() => this.props.navigation.goBack()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ecf0f1',
    },
    largeLogo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    smallLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    paragraph: {
        margin: 24,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});