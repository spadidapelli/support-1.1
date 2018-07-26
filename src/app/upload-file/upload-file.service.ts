import { Injectable } from "@angular/core";
import { UploadFileResponse } from "./upload-file.model";

import '../../../node_modules/rxjs//add/operator/map';
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "../../../node_modules/rxjs";

@Injectable()
export class UploadFileService {

    /**place holder for file upload respose */
    public static  uploadResp:UploadFileResponse;
    constructor(private http: HttpClient) {

    }
    
     /**
     * Api post call to upload the file to the server
     */
    public uploadFile(file: File, path: string): Observable<UploadFileResponse> {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<UploadFileResponse>(path, formData);
    }

}

