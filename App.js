/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Markdown from "react-native-simple-markdown";
import {createElement} from "react/cjs/react.production.min";
import _ from 'lodash'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let zzz = 1;
let imgSource = {uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"};
let inputText = "empty";
const Strong = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
let t = 'FFF<Strong>ZZZ</Strong>FFF';

export default class App extends Component<{}> {

    constructor() {
        super();
        zzz = 0;
        // setInterval(() => {
        //     ++zzz;
        //     this.setState({});
        // }, 500);
    }

    render() {

        let textA = '- itemA\n- itemB\n- itemC';

        let text = 'Some text before header.\n' +
            '### Does it look like a header?\n' +
            'Paragraph of text is here. Paragraph of text is here. Paragraph of text is here. Paragraph of text is here. Paragraph of text is here.\n' +
            '### Bold and Italic texts\n' +
            '**Bold** and _italic_.\n' +
            '### Link to website\n' +
            '[Go to Google](https://google.com)\n' +
            '### Link to e-mail\n' +
            '[Email to Support](mailto:support@hello.com)\n' +
            '### Link to phone number\n' +
            '[Manager](tel:666)\n' +
            '### Bullet list\n' +
            '- item ab\n' +
            '- item bb\n' +
            '- item cb\n' +
            '### Numbered list\n' +
            '1. item a\n' +
            '2. item b\n' +
            '3. item c';

        text = text.replace(
            new RegExp('\n', 'g'),
            '\n\n'
        );

        // textA = textA.replace(
        //     new RegExp('\n', 'g'),
        //     '\n\n'
        // );

        return (
            <View style={{padding:5}}>
                <Markdown
                    styles={markdownStyles}
                    rules={{
                        list: {
                            react: (node, output, state) => {
                                const items = _.map(node.items, (item, i) => {
                                    let bullet;
                                    let content = getContent(item);
                                    if (node.ordered) {
                                        bullet = createElement(Text, {
                                            key: state.key,
                                            //style: styles.listItemText
                                        }, (i + 1) + '. ' + content);
                                    }
                                    else {
                                        bullet = createElement(Text, {
                                            key: state.key,
                                            //style: styles.listItemText
                                        }, ('• ' + content));
                                    }

                                    console.log("SSSS: " + JSON.stringify(item) + ">" + getContent(item));

                                    return createElement(View, {
                                        key: i,
                                        //style: styles.listItemText
                                    }, bullet)
                                });

                                return createElement(View, {
                                    key: state.key,
                                    //style: styles.listItemText
                                }, items)
                            }
                        }
                    }}
                >{text}</Markdown>
            </View>
        );
    }
}

function getContent(item) {
    var result = null;
    var maxDeep = 15;
    while (result == null) {

        console.log('check item:' + JSON.stringify(item));

        maxDeep--;
        if (maxDeep === 0) {
            result = 'error list item parsing';
            break;
        }

        if (item instanceof Array) {
            item = item[0];
        } else {
            if (item.type === 'text') {
                result = item.content;
                break;
            } else {
                item = item.content;
            }
        }
    }
    return result;
}

const markdownStyles = {
    text: {
        color: '#000000'
    },
    heading: {
        fontWeight: 'bold',
        color: '#ffffff',
        textColor: '#ff7c8b',
        fontSize: 18
    },
    listItemText:{
        color:'#ffffff',
        backgroundColor: '#ff7c8b'
    }
};