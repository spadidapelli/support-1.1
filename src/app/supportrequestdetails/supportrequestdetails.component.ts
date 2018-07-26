import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { debounce as _debounce, find as _find, get as _get } from "lodash";
import { UploadFileService } from '../upload-file/upload-file.service';
import { FileTypeToIconService } from '../upload-file/file-type-to-icon-service';
import { FileWrapper, AddFileErrorEvent, UploadFileResponse, UploadFileErrorEnum, UPLOAD_URL, MAX_CHAR_LENGTH } from '../upload-file/upload-file.model';

@Component({
  selector: 'app-supportrequestdetails',
  templateUrl: './supportrequestdetails.component.html',
  styleUrls: ['./supportrequestdetails.component.scss']
})
export class SupportrequestdetailsComponent implements OnInit {

  /** function to retrevie the remaning characters*/  
  countRemainingChars: Function;

  /** get the remaining characters*/
  notesRemainingChars: number;


  /**support request details form instance*/
  supportRequestDetailsForm: FormGroup;

  /** Max no of characters in the notes section */
  maxNotesLength: number = MAX_CHAR_LENGTH;

  
  /** files list holds the info about uploading files*/
  filesList: FileWrapper[];

  /** files list holds the info about uploaded attachment existing  files*/
  existingFilesList : FileWrapper[];

  /**files list holds which are not uploaded */
  filesCancelList: FileWrapper[];

  /**files list holds which are not uploaded for existing */
  existfilesCancelList :FileWrapper[];

  /**files list holds errors details for uploaded files */
  fileErrorsList: AddFileErrorEvent[];

  /**status flag to show the value of upload in progress */
  uploadInProgress: boolean = false;

  /**counter hold the numbers for uploaded files */
  fileUploadCountId: number = 0;

 /**counter hold the numbers for exising uploaded files */
  fileExistCountId : number = 0;

  /**flag used to disable the upload area */
  uploadEnabled: boolean = true;

  /**flag used to display the existing attachments */
  viewExistAttach : boolean = false;

 
   /**
    * Initial config for serviceRequest details 
    * @param formBuilder 
    * @param uploadFileService 
    * @param fileTypeToIconService 
    */
  constructor(private formBuilder: FormBuilder,
    private uploadFileService: UploadFileService,
    private fileTypeToIconService: FileTypeToIconService
  ) { }


  /**
   * Initialise the form and get exisitng attachments onload
   */
  ngOnInit() {
    this.supportRequestDetailsForm = this.formBuilder.group({
      'notes': ['', [Validators.required,Validators.maxLength(4000)]]
    });
    this.countRemainingChars = (event) =>{
      this.notesRemainingChars = 4000 - event.target.value.length;
    };

    this.filesList = [];
    this.filesCancelList = [];
    this.fileErrorsList = [];
    this.existingFilesList = [];
    this.existfilesCancelList = [];
    this.getExistingAttach();
  }

  onSubmit(){

  }


  /**
   * Get the respective file icon for the file status display
   * @param file 
   */
  getFileIcon(file: FileWrapper): string {
    return this.fileTypeToIconService.getFileIcon(file);
  }

  /**
   * Toggle attachments section when we click on show attachment
   */
  toggleShowAttachments(){
     this.viewExistAttach =  !this.viewExistAttach;
  }

  /**
   * Used to get the validity of the form Control field
   * @param controlName 
   */
  isControlInvalid(controlName: string) {
    return this.supportRequestDetailsForm.controls[controlName].invalid && this.supportRequestDetailsForm.controls[controlName].touched;
  }

  /**
   * Called when we get any errors when uploading a file
   * @param event
   */
  onValidationError(event: AddFileErrorEvent): void {
    this.fileErrorsList.push(event);
}


 /** Mock function to create the dummy attachments on load */
 getExistingAttach(){
    let  reqOneFile =  new File(["reqOne"], "reqOne.txt", {
        type: "text/plain",
      });
    let  reqTwoFile =  new File(["reqTwo"], "reqTwo.txt", {
        type: "text/plain",
    });
    this.existingFilesList.push(this.createExistingFileWrapper(reqOneFile));  
    this.existingFilesList.push(this.createExistingFileWrapper(reqTwoFile)); 
 }

  /**
   * Invoked when we upload any file to attach
   * @param event
   */
  handleFileListChange(event: any): void {

    if (!event.file) {
        return;
    }

    /** creating a file wrapper object to track uploaded files */
    let fileWrapper: FileWrapper = this.createFileWrapper(event.file);
    this.filesList.push(fileWrapper);

    this.fileErrorsList = [];

   
    this.uploadInProgress = true;



    this.uploadFileService.uploadFile(event.file, UPLOAD_URL).subscribe((res: UploadFileResponse) => {
        fileWrapper.metaData.uploadProgress = 100;
        this.uploadInProgress = false;
        fileWrapper.metaData.status = res.status;
        fileWrapper.metaData.fileId = res.fileId;
    }, err => {
        // For demo purpose mocking the validation to successful use case scenario
        this.uploadInProgress = false;
        fileWrapper.metaData.status =  '43bc39e8-bcd4-4bfc-903b-9faf4ab4d937';
        fileWrapper.metaData.fileId =  'SUCCESS';
        fileWrapper.metaData.uploadProgress = 100; 

        // For demo purpose mocking the validation to successful use case scenario
        //this.removeFileByName(event.file.name);
        //this.onValidationError(this.createFileServerError(err.statusCode ? err.message : "Failed to attach file. Unknown error occurred"));
    });
}

/****
 * Used to create a file wrapper object with inital file upload status attributes 
 * @param File
 * @returns FileWrapper
 */
createFileWrapper(file: File): FileWrapper {
    return {
        file: file,
        metaData: {uploadProgress: 0, id: this.getFileCountId()}
    };
}



/****
 * Used to create a file wrapper object with inital file upload status attributes  for attached files
 * @param File
 * @returns FileWrapper
 */
createExistingFileWrapper(file: File): FileWrapper {
    return {
        file: file,
        metaData: {uploadProgress: 100, id: this.getExistFileCountID()}
    };
}



/****
 * Used to create a file wrapper object if any error occurs for uploading files
 * @param errorMessage
 * @returns AddFileErrorEvent
 */
createFileServerError(errorMessage: string): AddFileErrorEvent {
    return {
        errorId: UploadFileErrorEnum.SERVER_ERROR,
        msg: errorMessage
    };
}

/****
 * used to remove the file by id from the uploaded files 
 * @param id
 * 
 */

removeFileById(id: any): void {
    this.filesCancelList = this.filesCancelList.concat(this.filesList.filter(fileWrapper => fileWrapper.metaData.id === id));
    this.filesList = this.filesList.filter(fileWrapper => fileWrapper.metaData.id !== id);
    this.uploadEnabled = true;
}

/****
 * used to remove the file by id from the existing uploaded files 
 * @param id
 * 
 */
removeExistFileById(id:any) : void {
    this.existfilesCancelList = this.existfilesCancelList.concat(this.existingFilesList.filter(fileWrapper => fileWrapper.metaData.id === id));
    this.existingFilesList = this.existingFilesList.filter(fileWrapper => fileWrapper.metaData.id !== id); 
}

/****
 * used to remove the file by name from the uploaded files 
 * @param id
 * 
 */
removeFileByName(name: string) {
    this.filesList = this.filesList.filter(fileWrapper => fileWrapper.file.name !== name);
}

/****
 * Used to remove the file error in the errors list
 * @param id
 * 
 */
removeFileError(errorId: any): void {
    this.fileErrorsList = this.fileErrorsList.filter(fileError => fileError.errorId !== errorId);
}


/****
 * returns the total count for the uploaded files
 * @returns number
 */
getFileCountId(): number {
    return ++this.fileUploadCountId;
}

/****
 * returns the total count for the existing uploaded files
 * @returns number
 */
getExistFileCountID() : number {
    return ++this.fileExistCountId;
}
        
}
