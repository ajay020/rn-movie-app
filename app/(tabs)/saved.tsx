import FavouriteMovieCard from "@/components/FavouriteMovieCard";
import { getAllFavorites, removeFavorite } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const { data: favourites, loading, refetch: loadFavorites } = useFetch(() =>
    getAllFavorites()
  );

  // Refresh favorites every time user opens this tab
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleRemove = async (movieId: number) => {
    await removeFavorite(movieId);
    loadFavorites(); // refresh list
  };


  return (
    <SafeAreaView className="bg-primary flex-1 ">
      <View className="flex flex-1 flex-col p-2">

        {loading &&
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" />
          </View>
        }

        {
          favourites?.length == 0 && (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg">No favorite movies yet</Text>
            </View>
          )
        }

        {
          favourites?.length && favourites.length > 0 && (
            <FlatList
              className="mb-4 mt-3"
              data={favourites}
              numColumns={3}
              keyExtractor={(item) => item.movieId.toString()}
              ItemSeparatorComponent={() => <View className="w-4" />}
              contentContainerStyle={{
                padding: 2,
                gap: 4,
              }}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 18,
                paddingRight: 10,
                marginBottom: 10
              }}
              renderItem={({ item }) => (
                <FavouriteMovieCard
                  movie={item}
                  onUnlike={() => handleRemove(item.movieId)}
                />)}
            />
          )
        }

      </View>
    </SafeAreaView>
  );
};

export default Save;