

import spotify from '../services/spotify';
import user from '../services/user';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { searchResult, spotifyTrack, UserType } from '../types';

export const resolvers = {

    Query: {

        search: async (_root: any, args: { track: string; page: number; }): Promise<searchResult | void> => {

            const track: string = args.track;
            const page: number = args.page;
            let tracks: spotifyTrack[] | null = null;
            let fetchedTracks: string[];
            let total: number;

            return track.includes('Test_') ? spotify.test(track, page) :

                await spotify.search(track, page).then(result => {

                    tracks = result.tracks.items;
                    fetchedTracks = tracks.map(value => value.name);
                    total = result.tracks.total;

                    return { tracks: fetchedTracks, total: total };

                }).catch((error: Error) => {

                    console.error(error.stack);

                    if (error instanceof ApolloError) {
                        throw new ApolloError(error.message);
                    }
                    else if (error instanceof UserInputError) {
                        throw new UserInputError(error.message);
                    }
                });


        },

        searchUser: async (_root: any, args: { firstname: string; lastname: string; username: string; }): Promise<UserType | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const username: string = args.username;

            return await user.search(firstname, lastname, username).then(result => {

                return {
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname
                };

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

        }


    },
    Mutation: {

        create: async (_root: any, args: { username: string, password: string, firstname: string, lastname: string}): Promise<void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const username: string = args.username;
            const password: string = args.password;

     

        }

    }
};

