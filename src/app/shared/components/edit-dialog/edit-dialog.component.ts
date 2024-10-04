import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  postForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post, isEditMode: boolean }
  ) {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      companyName: ['', Validators.required],
    });

    this.isEditMode = data.isEditMode;
  }

  ngOnInit(): void {
    if (this.data && this.data.post) { 
      this.postForm.patchValue({
        name: this.data.post.name,
        username: this.data.post.username,
        email: this.data.post.email,
        phone: this.data.post.phone,
        companyName: this.data.post.company?.name || '', 
      });
    } else {
      console.error('El post no está definido o es null');
    }
  }

  savePost(): void {
    if (this.postForm.valid) {
      const updatedPost = {
        ...this.data.post,  // Asegúrate de mantener los datos existentes del post
        ...this.postForm.value,
        company: { name: this.postForm.value.companyName }
      };
  
      this.dialogRef.close(updatedPost); // Devuelve el post actualizado
    }
  }
  
  

  closeDialog(): void {
    this.dialogRef.close();
  }
}
