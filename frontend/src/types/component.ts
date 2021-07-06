

import { UserType } from "./user";
import { FavoritesType, NewTrack } from "../types/spotify";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface RefreshedToken {
  access_token: string;
  expires_in: string;
}

export interface BasicComponent {
  showmessage: (message: string, type: string) => void;

}

export interface loginComponent extends BasicComponent {
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

export interface SearchForm extends BasicComponent {
  authorization: boolean;
}

export interface ComponentAttribueId extends BasicComponent {
  id: string;
}

export interface ComponentAttributeUser extends ComponentAttributeModal {
  user: UserType;
}

export interface ComponentAttributeModal extends BasicComponent {
  show: boolean;
}

export interface ComponentAttributeList extends ComponentAttributeModal {
  tracks: FavoritesType;
}

export interface ComponentAttributeTrack extends ComponentAttributeModal {
  tracks: NewTrack[];
  TransferToPlaylist: (tracks: NewTrack[]) => Promise<void>;
  user: UserType;
  newtoken: RefreshedToken;
}

export interface ComponentInput {
  hasError: boolean;
  errorMessage: string;
  inputMessage: string;
  id: string;
  type: string;
  defaultInput: string;
}