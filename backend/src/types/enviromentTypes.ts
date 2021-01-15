

export interface searchEnv {
    querypart1: string;
    typepart2: string;
    offsetpart3: string;
    limitpart4: string;
  }
  
  export interface sessionEnv {
    granttype: string;
    refreshtoken: string;
    sessionUrl: string;
    code: string;
    secret: string;
    redirect_uri: string;
    granttype_code: string;
  }
  
  export interface playListEnv {
    accountId: string;
    playlistpart1: string;
    playlistpart3: string;
  }
  
  export interface tracksEnv {
    trackpart1: string;
    trackpart3: string;
  }