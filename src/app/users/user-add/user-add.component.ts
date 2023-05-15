import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const APP_USER_PROFILE = "dearframes_user"


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  et:any;
  clr:any = '#E91E63';
  showErr: Boolean = false;
  loading: Boolean = false;

    userSForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      time: ['', Validators.required],
      services: [[], Validators.required],
      role: ['user', Validators.required]
    });

   userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      time: ['', Validators.required],
      role: ['user', Validators.required],
      word_cloud_maker: [false],
      magazine_art_maker: [false],
      text_art_maker: [false],
      brand_image_maker: [false],
      sketch_art_maker: [false],
      sticker_maker: [false],
      star_map_maker: [false],
      street_map_maker: [false],
      collage_maker: [false]
    });

     constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private auth: AuthService
    ) { }

    addUser(): any {

      this.et = '';
      this.showErr = false;

      let _services:any = [];
      if( this.userForm.controls['name'].valid && this.userForm.value.name ){
        this.userSForm.controls['name'].setValue(this.userForm.value.name);
      }
      if( this.userForm.controls['email'].valid && this.userForm.value.email ){
        this.userSForm.controls['email'].setValue(this.userForm.value.email);
      }
      if( this.userForm.controls['username'].valid && this.userForm.value.username ){
        this.userSForm.controls['username'].setValue(this.userForm.value.username);
      }
      if( this.userForm.controls['password'].valid && this.userForm.value.password ){
        this.userSForm.controls['password'].setValue(this.userForm.value.password);
        if( this.userForm.value.cpassword != this.userForm.value.password ) {
          this.showErrM('Password not matched!');
          return false;
        }
      }
      if( this.userForm.controls['time'].valid && this.userForm.value.time ){
        this.userSForm.controls['time'].setValue(this.userForm.value.time);
      }
      if( this.userForm.controls['role'].valid && this.userForm.value.role ){
        this.userSForm.controls['role'].setValue(this.userForm.value.role);
      }
      if( this.userForm.controls['word_cloud_maker'].valid && this.userForm.value.word_cloud_maker ){
        _services.push('word_cloud_maker');
      }
      if( this.userForm.controls['magazine_art_maker'].valid && this.userForm.value.magazine_art_maker ){
        _services.push('magazine_art_maker');
      }
      if( this.userForm.controls['text_art_maker'].valid && this.userForm.value.text_art_maker ){
        _services.push('text_art_maker');
      }
      if( this.userForm.controls['brand_image_maker'].valid && this.userForm.value.brand_image_maker ){
        _services.push('brand_image_maker');
      }
      if( this.userForm.controls['sketch_art_maker'].valid && this.userForm.value.sketch_art_maker ){
        _services.push('sketch_art_maker');
      }
      if( this.userForm.controls['sticker_maker'].valid && this.userForm.value.sticker_maker ){
        _services.push('sticker_maker');
      }
      if( this.userForm.controls['star_map_maker'].valid && this.userForm.value.star_map_maker ){
        _services.push('star_map_maker');
      }
      if( this.userForm.controls['street_map_maker'].valid && this.userForm.value.street_map_maker ){
        _services.push('street_map_maker');
      }
      if( this.userForm.controls['collage_maker'].valid && this.userForm.value.collage_maker ){
        _services.push('collage_maker');
      }

      if( _services.length < 1 ) {
        this.showErrM('Select atleast one service');
        return false;
      }
      this.userSForm.controls['services'].setValue(_services);



      if( this.userSForm.valid ) {

          this.et = '';
          this.loading = true;
          this.auth.signup(this.userSForm.value).subscribe((data:any)=> {
            if(data.token) {
                this.loading = false;
              this.userSForm.reset();
              this.userForm.reset();
              this.showErrM('Customer created!','#4caf50');
            }
          },(err)=>{
              this.et = err.error.errors.msg;this.loading = false;
              console.clear();
          });


        console.log(this.userSForm.value);
      } else {
          this.showErrM('Fill all fields!!!');
          return false;
      }
        console.log(this.userSForm.value);
        console.log(_services);



    }

  setValue(controlName: string) {
    const prevValue = this.userForm.get(controlName)?.value;
    const groupValue = this.userForm.getRawValue();
    const newGroupValue = { ...groupValue, [`${controlName}`]: !prevValue };
    this.userForm.setValue(newGroupValue);
  }

  showErrM(msg:any,clr:any = '#E91E63') {
    this.et = msg;
    this.clr = clr;
    this.showErr = true;
  }
}
