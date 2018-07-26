import { Injectable } from "@angular/core";
import { FileWrapper } from "./upload-file.model";


@Injectable()
export class FileTypeToIconService {
    constructor() {
    }


    /**
     * Get the file icon for the file wrapper object
     * @param fileWrapper 
     */
    public getFileIcon(fileWrapper: FileWrapper): string {
        let type = fileWrapper.file.type.replace(/\/.*$/, '');

        const FILE_MAPPING = {
            image: 'image'

        };

        let typeClarityImg = FILE_MAPPING[type] || 'file';

        return typeClarityImg;
    }
}