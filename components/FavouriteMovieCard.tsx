import { isMovieLiked } from "@/services/appwrite";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


interface FavouriteMovieCard {
    movie: FavouriteMovie;
    onUnlike?: () => void;
}

const FavouriteMovieCard = ({
    movie: { movieId, poster_url, title },
    onUnlike,
}: FavouriteMovieCard) => {
    const [isLiked, setIsLiked] = useState(false);

    // Check in Appwrite if movie is already liked
    useEffect(() => {
        const checkFavorite = async () => {
            const liked = await isMovieLiked(movieId.toString());
            setIsLiked(liked);
        };

        checkFavorite();
    }, []);

    const toggleLike = async () => {
        setIsLiked(!isLiked);
        if (onUnlike) onUnlike();
    }

    return (
        <Link href={`/movies/${movieId}`} asChild>
            <TouchableOpacity className="w-[30%] ">
                <View className="relativ">
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
                    <Image
                        source={{ uri: poster_url }}
                        className="w-32 h-48 rounded-lg"
                        resizeMode="cover"
                    />
                    <Text
                        className="text-sm font-bold mt-2 text-light-200"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default FavouriteMovieCard;