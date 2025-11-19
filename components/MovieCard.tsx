import { AntDesign } from '@expo/vector-icons';
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";
import { isMovieLiked, removeFavorite, saveFavorite } from '@/services/appwrite';
import { useEffect, useState } from 'react';

const MovieCard = ({
    id,
    poster_path,
    title,
    vote_average,
    release_date,
}: Movie) => {
    const [isLiked, setIsLiked] = useState(false);

    // Check in Appwrite if movie is already liked
    useEffect(() => {
        const checkFavorite = async () => {
            const liked = await isMovieLiked(id.toString());
            setIsLiked(liked);
        };

        checkFavorite();
    }, []);

    const toggleLike = async () => {
        setIsLiked(!isLiked); // immediate UI update

        const movieData = {
            movieId: id.toString(),
            title,
            poster_url: `https://image.tmdb.org/t/p/w500${poster_path}`,
            userId: "test-user", // Replace with actual user ID
        };

        if (!isLiked) {
            // Save to Appwrite
            await saveFavorite(movieData);
        } else {
            // Remove from Appwrite
            await removeFavorite(id);
        }
    };

    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%] ">
                <View className="relative">

                    {/* Heart Icon */}
                    <TouchableOpacity
                        onPress={toggleLike}
                        className="absolute top-2 right-2 z-10 bg-black/40 p-2 rounded-full"
                    >
                        {isLiked ? (
                            <AntDesign name="heart" size={16} color="red" />
                        ) : (
                            <AntDesign name="heart" size={16} color="white" />
                        )}
                    </TouchableOpacity>

                    {/* Movie Poster */}
                    <Image
                        source={{
                            uri: poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                        }}
                        className="w-full h-52 rounded-lg"
                        resizeMode="cover"
                    />
                </View>


                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {title}
                </Text>

                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split("-")[0]}
                    </Text>
                    <Text className="text-xs font-medium text-light-300 uppercase">
                        Movie
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;