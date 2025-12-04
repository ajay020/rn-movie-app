import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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


export const _Layout = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "auto",
                    height: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 10,
                    paddingHorizontal: 16,
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

export default _Layout
