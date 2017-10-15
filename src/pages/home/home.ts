import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public currentImage : any;
	public base64Image : string;

  constructor(public navCtrl: NavController, 
  	private camera: Camera, 
  	private emailComposer: EmailComposer,
  	private alertCtrl : AlertController) { }


    ngOnInit() {
    this.currentImage = [];
  }


   captureImage() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 768,
      targetHeight: 1024,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
 
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
      //this.currentImage.push(this.base64Image);
      //this.currentImage.reverse();
    }, (err) => {
      // Handle error
      console.log('Image error: ', err);
    });
  }
 
  sendEmail() {
    let email = {
      to: 'guidocort@gmail.com',
      cc: '',
      attachments: [
        this.currentImage
      ],
      subject: 'My Cool Image',
      body: 'Hey Simon, what do you thing about this image?',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }




  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.currentImage.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }



    takePhoto() {
    const options : CameraOptions = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.FILE_URI,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options)
      .then((imageData) => {
        this.currentImage = "data:image/jpeg;base64," + imageData;
        //this.currentImage.push(this.base64Image);
        //this.currentImage.reverse();
      }, (err) => {
        console.log(err);
      });
  }








}
