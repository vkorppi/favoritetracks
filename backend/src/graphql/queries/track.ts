import spotify from '../../services/spotify';
import user from '../../services/user';
import { ApolloError, UserInputError,  ForbiddenError} from 'apollo-server-express';
import {  searchResult  } from '../../types/searchType';
import {  spotifyTrackMinimal } from '../../types/spotifyTypes';
import { track } from '../../types/favoritesTypes';
import { requestType } from '../../types/sessionTypes';

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

export const getFavorites = async (_root: unknown, args: unknown , { req }: requestType): Promise<void | track[] | null> => {

          
    if(args) null;

    const loggedUser= await user.session.hasSession(req.session.sessionid);

    if(!loggedUser) {
        throw new ForbiddenError("Unauthorized action");
    }
    
    return await spotify.GetFavorites(loggedUser.id).then(result => { 

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
    getFavorites
};