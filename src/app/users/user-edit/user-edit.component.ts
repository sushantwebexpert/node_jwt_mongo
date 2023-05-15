import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

   users:any;
   et:any;
   uId:any;
  clr:any = '#E91E63';
  showErr: Boolean = false;
  loading: Boolean = false;

    userSForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      // password: ['', Validators.required],
      time: ['', Validators.required],
      services: [[], Validators.required],
      role: ['user', Validators.required]
    });

    userPForm = this.fb.group({
      id: ['', Validators.required],
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required]
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
      private api: ApiService,
      private auth: AuthService
    ) { }

     ngOnInit(): void {
      const itemId = this.route.snapshot.paramMap.get('id');
      this.uId = itemId;
      setTimeout(() => {
        this.getOne(itemId);
      })

  }

    getOne(itemId:any) {

        this.loading = true;
        this.api
            .getOne('users', itemId)
            .subscribe(
                data => {
                  console.log(data);
                    this.loading = false;
                    this.users = data;
                    this.setAll();
                },
                error => {
                    this.loading = false;
                }
            );
  }

    setAll() {

      this.userForm.controls['name'].setValue(this.users.name);
      this.userForm.controls['email'].setValue(this.users.email);
      this.userForm.controls['username'].setValue(this.users.username);
      this.userForm.controls['time'].setValue(this.users.time);
      this.userForm.controls['role'].setValue(this.users.role);
      this.users.services.forEach((f:String) => {
          (f==`word_cloud_maker`) ? this.userForm.controls[`word_cloud_maker`].setValue(true) : `` ;
          (f==`magazine_art_maker`) ? this.userForm.controls[`magazine_art_maker`].setValue(true) : `` ;
          (f==`text_art_maker`) ? this.userForm.controls[`text_art_maker`].setValue(true) : `` ;
          (f==`brand_image_maker`) ? this.userForm.controls[`brand_image_maker`].setValue(true) : `` ;
          (f==`sketch_art_maker`) ? this.userForm.controls[`sketch_art_maker`].setValue(true) : `` ;
          (f==`star_map_maker`) ? this.userForm.controls[`star_map_maker`].setValue(true) : `` ;
          (f==`sticker_maker`) ? this.userForm.controls[`sticker_maker`].setValue(true) : `` ;
          (f==`street_map_maker`) ? this.userForm.controls[`street_map_maker`].setValue(true) : `` ;
          (f==`collage_maker`) ? this.userForm.controls[`collage_maker`].setValue(true) : `` ;
      });

      this.userSForm.controls['name'].setValue(this.users.name);
      this.userSForm.controls['email'].setValue(this.users.email);
      this.userSForm.controls['username'].setValue(this.users.username);
      this.userSForm.controls['time'].setValue(this.users.time);
      this.userSForm.controls['services'].setValue(this.users.services);
      this.userSForm.controls['role'].setValue(this.users.role);



  }


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
        // this.userSForm.controls['password'].setValue(this.userForm.value.password);
        this.userPForm.controls['id'].setValue(this.uId);

        this.userPForm.controls['newPassword'].setValue(this.userForm.value.password);
        this.userPForm.controls['oldPassword'].setValue(this.userForm.value.password);

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


      console.log(this.userSForm.value);
      console.log(this.userForm.value);
      if( this.userSForm.valid ) {

          this.et = '';
          this.loading = true;
          this.api.updateOne('users', this.users._id, this.userSForm.value)
            .subscribe(
                data => {
                    this.showErrM('Customer updated!','#4caf50');
                    this.userSForm.reset();
                },
                error => {
                    this.showErrM(error.error.errors.msg);
                }
            );


          
          console.log(this.userPForm.value);

          if( this.userPForm.valid ) {
              this.api.updatePassword(this.userPForm.value)
              .subscribe(
                  data => {
                      this.showErrM('Password Changed!','#4caf50');
                      this.userPForm.reset();

                  },
                  error => {
                      this.showErrM(error.error.errors.msg);
                  }
            );
          }


        }

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
    this.loading = false;
  }
}
