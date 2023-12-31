import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import styles from './styles';

interface Route {
    params: {
        article: {
            author: string;
            title: string;
            image_url: string;
            publishedAt: string;
            url: string;
            content: string;
        };
        articleIndex: number;
    };
}
export const NewsDetails: React.FC<{ route: Route }> = ({ route }) => {
    const { article, articleIndex } = route?.params;
    const navigation = useNavigation();
    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);
    const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';
    const color = useColorScheme() === 'dark' ? '#fff' : '#000';
    const contentColor = useColorScheme() === 'dark' ? '#bbb' : '#444';
    const readMoreBgColor = useColorScheme() === 'dark' ? '#222' : '#ddd';
    const handleURLPress = useCallback(() => {
        Linking.openURL(article?.url);
    }, [article]);
    console.log(article)

    return (
        <>
            <TouchableOpacity style={styles.crossContainer} onPress={goBack}>
                <Image style={styles.cross} source={require('../../../assets/back.png')} />
            </TouchableOpacity>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={[styles.container, { backgroundColor }]}
                contentContainerStyle={styles.contentContainer}>
                <SharedElement id={`article#${articleIndex}-Image`}>
                    <Image
                        style={styles.image}
                        source={{ uri: article?.image_url ?? `https://picsum.photos/1000`, cache: 'force-cache', }}
                        resizeMode={'cover'}
                    />
                </SharedElement>
                <Text style={[styles.title, { color }]}>{article?.title}</Text>
                <Text style={[styles.content, { color: contentColor }]}>
                    {article?.content}
                </Text>
            </ScrollView>
            <View
                style={[styles.readMoreContainer, { backgroundColor: readMoreBgColor }]}>
                <Text style={[styles.readMoreText, { color }]} numberOfLines={2}>
                    Read more at{' '}
                    <Text style={styles.link} onPress={handleURLPress}>
                        {article?.url}
                    </Text>
                </Text>
            </View>
        </>
    );
};

(NewsDetails as any).sharedElements = (route: any) => {
    const { articleIndex } = route.params;
    return [`article#${articleIndex}-Image`];
};