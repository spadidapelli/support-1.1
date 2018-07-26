import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AddFileErrorEvent, AddFileEvent, FileWrapper } from "./upload-file.model";

@Component({
    selector: 'upload-file',
    styleUrls: ['upload-file.component.scss'],
    templateUrl: 'upload-file.component.html'
})
export class UploadFileComponent {
    
    /**disable the upload input if file attachment is in progress */
    @Input() uploadDisabled: boolean;

    /**add File event used to update about the file being uploaded */
    @Output() addFile = new EventEmitter<AddFileEvent>();


    /**
     * Called when attach any file 
     * @param event 
     */
    updateSelectedFiles(event: any): void {
        let file: any = event.target.files[0];
        // on cancel, the (change) is called but no file is selected.
        if (!file) {
            return;
        }
        this.addFile.emit({file: file});
    }
}