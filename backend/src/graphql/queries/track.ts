import spotify from '../../services/spotify';
import { ApolloError, UserInputError,  } from 'apollo-server-express';
import {  searchResult  } from '../../types/searchType';
import {  UserSchemaType } from '../../types/userTypes';
import {  spotifyTrackMinimal } from '../../types/spotifyTypes';
import { trackObject } from '../../types/favoritesTypes';

export const search =async (_root: unknown, args: { track: string; page: number; }): Promise<searchResult | void> => {

    const track: string = args.track;
    const page: number = args.page;

    let tracks: spotifyTrackMinimal[] | null = null;

    let total: number;

    return track.includes('Test_') ? spotify.test(track, page) :
        await spotify.search(track, page).then(result => {

            tracks = result.tracks.items;
            total = result.tracks.total;

            return { tracks: tracks, total: total };

        }).catch((error: Error) => {

            console.error(error.stack);

            if (error instanceof ApolloError) {
                throw new ApolloError(error.message);
            }
            else if (error instanceof UserInputError) {
                throw new UserInputError(error.message);
            }
        });
};

export const getList = async (_root: unknown, args: unknown , userdata: UserSchemaType): Promise<void | trackObject[] | null> => {

    console.log(userdata.id)
          
    if(args) null;

    if(!userdata || !userdata.id) {
        return null;
    }
    
    return await spotify.GetList(userdata.id).then(result => { 

        return result;

    }).catch((error: Error) => {

        console.error(error.stack);

        if (error instanceof ApolloError) {
            throw new ApolloError(error.message);
        }
        else if (error instanceof UserInputError) {
            throw new UserInputError(error.message);
        }

    });
};

export default {
    search,
    getList
};