/** Add file Error event used to capture the error events */
export interface AddFileErrorEvent {
    errorId: number;
    msg: string;
}

/** Add file event generate when adding a file */
export interface AddFileEvent {
    file: File;
}

/**Constant for max length */
export const MAX_CHAR_LENGTH : number = 4000;

/**Constant for upload url */
export const UPLOAD_URL : string  = "https://servicerequest/attachments/upload";



/**Error code for server error */
export enum UploadFileErrorEnum {
    SERVER_ERROR = 6,
}

/**Upload file response interface*/
export interface UploadFileResponse {
    fileId: string;
    status: string;
}

/**File Object wrapper for file list maintainence */
export interface FileWrapper {
    metaData: FileWrapperMetaData;
    file: File;
}


/**Meta data for file wrapper object */
export interface FileWrapperMetaData {
    id: number; 
    fileId?: string; 
    status?: string;
    uploadProgress: number;
    errorMessage?: string;
}

