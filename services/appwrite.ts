import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const FAVORITES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_ID!;
const USER_ID = "test-user"; // Replace later with auth user id


const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query),
        ]);

        console.log("TITLE:", movie.title);
        console.log(result.documents)

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                title: movie.title,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
};

export const getTrendingMovies = async (): Promise<
    TrendingMovie[] | undefined
> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

// Save movie to favorites
export const saveFavorite = async (movie: any) => {
    try {
        const result = await database.createDocument(
            DATABASE_ID,
            FAVORITES_COLLECTION_ID,
            ID.unique(),
            movie
        );

        return result;
    } catch (err) {
        console.log("Error saving favorite:", err);
        throw err;
    }
};

// Remove a movie from favorites
export const removeFavorite = async (movieId: number) => {
    try {
        // find record
        const record = await database.listDocuments(
            DATABASE_ID,
            FAVORITES_COLLECTION_ID,
            [Query.equal("movieId", movieId), Query.equal("userId", USER_ID)]
        );

        if (record.documents.length > 0) {
            await database.deleteDocument(
                DATABASE_ID,
                FAVORITES_COLLECTION_ID,
                record.documents[0].$id
            );
        }
    } catch (err) {
        console.log("Error removing favorite:", err);
        throw err;
    }
};

// Check if movie is already liked
export const isMovieLiked = async (movieId: string) => {
    const result = await database.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.equal("movieId", movieId), Query.equal("userId", USER_ID)]
    );

    return result.documents.length > 0;
};

export const getAllFavorites = async (): Promise<FavouriteMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            FAVORITES_COLLECTION_ID,
            [Query.equal("userId", USER_ID)]
        );

        return result.documents as unknown as FavouriteMovie[];
    } catch (err) {
        console.log("Error loading favorites:", err);
        return undefined;
    }
};
