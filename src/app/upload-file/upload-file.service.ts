import { Injectable } from '@angular/core';
import { UploadFileResponse } from './upload-file.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UploadFileService {

    /**place holder for file upload respose */
    public static  uploadResp: UploadFileResponse;
    constructor(private http: HttpClient) {

    }
     /**
     * Api post call to upload the file to the server
     */
    public uploadFile(file: File, path: string): Observable<UploadFileResponse> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<UploadFileResponse>(path, formData);
    }

}

