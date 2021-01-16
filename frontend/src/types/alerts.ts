


export type AlertType =
{
  alert: AlertAttributes;
}

export type AlertAction =
{
  type: "SET";
  data: AlertAttributes;
}

export type AlertAttributes = {

[key: string]: boolean;
}

export interface MessageType {
    message: MessageAttributes;
  }
  
  export interface MessageAttributes {
    text: string;
    msgtype: string;
  }
  
  export type ActionMessage =
    {
      type: "SET_MESSAGE";
      data: MessageAttributes;
    } |
    {
      type: "CLEAR_MESSAGE";
      data: MessageAttributes;
    };