

import spotify from '../services/spotify';
import user from '../services/user';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { searchResult, spotifyTrack, UserType } from '../types';
import { MongoError } from 'mongodb';

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

        create: async (_root: any, args: { username: string, password: string, firstname: string, lastname: string }): Promise<boolean | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const username: string = args.username;
            const password: string = args.password;

            return await user.create(username, password, firstname, lastname).then(result => {
                console.log(result);
                return true;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });


        },

        updateName: async (_root: any, args: { firstname: string, lastname: string, id: string }): Promise<boolean | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const id: string = args.id;

            return await user.updateName(firstname, lastname, id).then(result => {
                console.log(result);
                return true;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });


        },

        updatePassword: async (_root: any, args: { password: string, id: string }): Promise<boolean | void> => {

            const password: string = args.password;
            const id: string = args.id;

            return await user.updatePassword(password,id).then(result => {
                console.log(result);
                return true;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });
        },

        remove: async (_root: any, args: { id: string }): Promise<boolean | void> => {

            const id: string = args.id;

            return await user.remove(id).then(result => {
                console.log(result);
                return true;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });
        },

        login: async (_root: any, args: { username: string,password: string }): Promise<boolean | void> => {

            const username: string = args.username;
            const password: string = args.password;

            return await user.login(username,password).then(result => {
                console.log(result);
                return true;

            }).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }
                else if (error instanceof MongoError) {
                    throw new UserInputError(error.message);
                }


            });
        }




    }
};

