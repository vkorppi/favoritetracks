

export interface ModalType {
    modal: Modalttributes;
  }
  
  export interface Modalttributes {
    show: boolean;
  }
  
  export type ActionModal =
    {
      type: "SET_SHOW";
      data: Modalttributes;
    }