import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { CaptchaModule } from 'primeng/captcha';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxFileDropModule } from 'ngx-file-drop';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    TabMenuModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    RatingModule,
    InputTextareaModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    CaptchaModule,
    MessagesModule,
    MessageModule,
    ToggleButtonModule,
    FileUploadModule,
    NgxFileDropModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports:[
    CardModule,
    InputTextModule,
    TabMenuModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    RatingModule,
    InputTextareaModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    CaptchaModule,
    MessagesModule,
    MessageModule,
    ToggleButtonModule,
    FileUploadModule,
    NgxFileDropModule,
    BrowserModule,
    BrowserAnimationsModule
  ],  
  declarations: []
})
export class VisualesModule { }