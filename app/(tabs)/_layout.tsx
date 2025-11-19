import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React, { Component } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

function TabIcon({ focused, icon, title }: any) {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="
                h-12
                w-[112]
                flex flex-row items-center justify-center 
                rounded-full overflow-hidden"
                resizeMode="stretch"
            >
                <Image source={icon} tintColor="#151312" className="size-4" />
                <Text className="text-secondary text-base font-semibold ml-1">
                    {title}
                </Text>
            </ImageBackground>
        );
    }

    return (
        <View className="justify-center items-center rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-4" />
        </View>
    );
}


export class _Layout extends Component {
    render() {
        return (
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        width: "100%",
                        height: "100%",
                        paddingTop: 12,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    tabBarStyle: {
                        backgroundColor: "#0F0D23",
                        height: 52,
                        marginHorizontal: 14,
                        marginBottom: 36,
                        borderRadius: 50,
                        position: "absolute",
                        overflow: "hidden",
                        borderColor: "#0F0D23",

                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.home} title="Home" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: 'Search',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.search} title="Search" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="saved"
                    options={{
                        title: 'Saved',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.save} title="Saved" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.person} title="Profile" />
                        ),
                    }}
                />
            </Tabs>
        )
    }
}

export default _Layout
