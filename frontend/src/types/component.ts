

import { UserType } from "./user";
import { ListType,NewTrack,RefreshedToken,Track } from "../type";

export interface BasicComponent {
    showmessage: (message: string, type: string) => void;
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
    list: ListType;
  }
  
  export interface ComponentAttributeTrack extends ComponentAttributeModal {
    tracks: NewTrack[];
    TransferToPlaylist: (tracks: NewTrack[]) => Promise<void>;
    user: UserType;
    newtoken: RefreshedToken;
  }
  
  export interface ComponentInput {
    hasError: boolean ;
    errorMessage: string;
    inputMessage: string;
    id: string;
    type: string;
    defaultInput: string;
  }