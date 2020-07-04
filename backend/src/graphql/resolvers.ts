
import user from '../services/user';
import spotify from '../services/spotify';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { MongoError } from 'mongodb';
import { UserSchemaType, searchResult, spotifyTrackMinimal, TokenType, UserSchemaType,spotifyTrackCapsulated, spotifyTrackMinimal2 } from '../types';


export const resolvers = {

    Query: {



        search: async (_root: any, args: { track: string; page: number; }): Promise<searchResult | void> => {

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


        },



        searchUser: async (_root: any, args: { value: string; }): Promise<UserSchemaType[] | void> => {

            const value: string = args.value;


            return await user.search(value).then(result => {

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

        },

        getUser: async (_root: any, args: { id: string; }): Promise<void | UserSchemaType | null> => {

            const id: string = args.id;

            return await user.getUser(id).then(result => {

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

        },
        
        getList: async (_root: any, args: any, userdata: UserSchemaType): Promise<void | spotifyTrackMinimal2[]> => {

        
            return await spotify.GetList(userdata.id).then(result => {                
                
                return result.items.map(value => ({ name: value.track.name, uri: value.track.uri }));

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

    },
    Mutation: {

        create: async (_root: any, args: {
            username: string, password: string, firstname: string,
            lastname: string, birthdate: string, email: string, address: string
        }): Promise<boolean | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const username: string = args.username;
            const password: string = args.password;
            const email: string = args.email;
            const address: string = args.address;
            const birthdate: string = args.birthdate;


            return await user.create(username, password, firstname, lastname, birthdate, email, address).then(result => {
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

        updateUser: async (_root: any, args: { firstname: string, lastname: string, birthdate: string, email: string, address: string, id: string }): Promise<boolean | void> => {

            const firstname: string = args.firstname;
            const lastname: string = args.lastname;
            const id: string = args.id;
            const birthdate: string = args.birthdate;
            const email: string = args.email;
            const address: string = args.address;


            return await user.update(firstname, lastname, birthdate, email, address, id).then(result => {
                return true;

            }).catch((error: Error) => {

                console.error(error.stack);


                if (error instanceof UserInputError) {
                    console.debug('UserInputError');
                    throw new UserInputError(error.message);
                }
                else if (error instanceof ApolloError) {
                    console.debug('ApolloError');
                    throw new ApolloError(error.message);
                }
                else if (error instanceof MongoError) {
                    console.debug('MongoError');
                    throw new UserInputError(error.message);
                }


            });


        },

        updatePassword: async (_root: any, args: { password: string, id: string }): Promise<boolean | void> => {

            const password: string = args.password;
            const id: string = args.id;

            return await user.updatePassword(password, id).then(result => {

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

                return true;

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

        login: async (_root: any, args: { username: string, password: string }): Promise<TokenType | void> => {

            const username: string = args.username;
            const password: string = args.password;

            return await user.login(username, password).then(result => {

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
        },


        addTrackToList: async (_root: any, args: { tracks: string[] }, userdata: UserSchemaType): Promise<boolean> => {

            const tracks: string[] = args.tracks;


            await spotify.AddToList(tracks, userdata.id).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

            return true;

        },

        removeItem: async (_root: any, args: { tracks: string[] }, userdata: UserSchemaType): Promise<boolean> => {

            const tracks: string[] = args.tracks;


            await spotify.removeItem(userdata.id,tracks).catch((error: Error) => {

                console.error(error.stack);

                if (error instanceof ApolloError) {
                    throw new ApolloError(error.message);
                }
                else if (error instanceof UserInputError) {
                    throw new UserInputError(error.message);
                }

            });

            return true;

        }



    }
};

