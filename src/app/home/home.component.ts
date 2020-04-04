import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/auth.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  title = 'DocumentShare';
  htmlContent = '';
  closeResult = '';
  email: string;
  document: any;
  internal: any;
  users: any;
  show = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial'
  };

  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;

  ngOnInit(): void {
    this.authService.getDocument()
      .subscribe((document: any) => {
        if (Object.keys(document.doc).length) {
          this.htmlContent = document.doc.content;
          this.document = document.doc;
          this.users = document.users;
        } else {
          this.authService.createDocument()
            .subscribe((doc: any) => {
              this.htmlContent = doc.content;
              this.document = doc;
            });
        }
      });
    this.sendContent();
  }

  openSnackBar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open('Document Shared!!', '', config);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (this.email) {
        const shareObj = {
          doc_id: this.document._id,
          email: this.email
        };
        this.authService.shareDocument(shareObj)
          .subscribe((res: any) => {
            this.openSnackBar();
          });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendContent() {
    this.internal = setInterval(() => {
      const document = {
        docId: this.document._id,
        content: this.htmlContent
      };
      this.authService.updateDocument(document)
        .subscribe((result: any) => {
          this.htmlContent = result.content;
        });
    }, 10000000000);
  }

  ngOnDestroy(): void {
    clearInterval(this.internal);
    this.authService.userOffline()
      .subscribe(() => { });
  }

  getClass(status) {
    switch (status) {
      case true:
        return { image: true };
      default:
        return { image_offline: true };
    }
  }
}
