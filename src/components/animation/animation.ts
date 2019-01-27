import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as THREE from 'three';

/**
 * Generated class for the AnimationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'animation-comp',
  templateUrl: 'animation.html'
})
export class AnimationComponent {


  /**
   * @name _DB
   * @type {object}
   * @private
   * @description     Defines an object for handling interfacing with the
              SQLite plugin
   */
  @ViewChild('domObj') canvasEl: ElementRef;


  private _ELEMENT: any;
  private _SCENE;
  private _CAMERA;
  public renderer;
  private _GEOMETRY;
  public _MATERIAL;
  public _CUBE;
  public spheres = [];
  private degreeX = 0;
  private mouseY = 0;
  private mouseStartX: number;
  private windowHalfX = window.innerWidth / 2;
	private windowHalfY = window.innerHeight / 2;

  /* var container;
			var camera, scene, renderer;
			var spheres = [];
			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2; */


  constructor(public navCtrl: NavController) { }


  ngAfterViewInit(): void {
    this.initialiseWebGLObjectAndEnvironment();
    this.renderAnimation();
  }


  initialiseWebGLObjectAndEnvironment(): void {
    this._ELEMENT = this.canvasEl.nativeElement;
    this._SCENE = new THREE.Scene();
    this._SCENE.background = new THREE.CubeTextureLoader()
    .setPath( '../../assets/imgs/cubeMap/' )
    .load( [ 
      'right.jpg', 
      'left.jpg', 'oben.jpg', 'unten.jpg', 'vorne.jpg', 'hinten.jpg' ] );
    this._CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this._CAMERA.position.z = 320;
    this._CAMERA.rotation.y = -30 * Math.PI / 180;
    this._CAMERA.rotation.x = 0;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this._ELEMENT.appendChild(this.renderer.domElement);
    this._GEOMETRY = new THREE.SphereGeometry(10, 32, 16);
    this._MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffffee, envMap: this._SCENE.background, refractionRatio: 0.75 });
    this._MATERIAL.envMap.mapping = THREE.CubeRefractionMapping;
    for (var i = 0; i < 50; i++) {
      var mesh = new THREE.Mesh(this._GEOMETRY, this._MATERIAL);
      mesh.position.x = Math.random() * 1000 - 500;
      mesh.position.y = Math.random() * 1000 - 500;
      mesh.position.z = Math.random() * 1000 - 500;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
      this._SCENE.add(mesh);
      this.spheres.push(mesh);
    }
  }


  private _animate(): void {
    requestAnimationFrame(() => {
      this._animate();
    });

    var timer = 0.00005 * Date.now();
    for (var i = 0, il = this.spheres.length; i < il; i++) {
      var sphere = this.spheres[i];
      sphere.position.x = 500 * Math.cos(timer + i);
      sphere.position.y = 500 * Math.sin(timer + i * 1.1);
    }

    this._CAMERA.rotation.x += (this._CAMERA.rotation.x + this.degreeX ) * .05;
				/* this._CAMERA.position.y += ( - this.mouseY - this._CAMERA.position.y ) * .05; */
				this._CAMERA.lookAt(this._SCENE.position );
				

    this.renderer.render(this._SCENE, this._CAMERA);
  };




  /**
   * Render the animation
   *
   * @public
   * @method _renderAnimation
   * @return {none}
   */
  renderAnimation(): void {
    //if (Detector.webgl)
    //{
    this._animate();
    /*}
    else {
       var warning = Detector.getWebGLErrorMessage();
       console.log(warning);
    }*/
  }

  moveStarted(event) {
    this.mouseStartX =  event.changedTouches[0].clientX;
  }

  moved(event) {
        this.degreeX = ( -(this.mouseStartX - event.changedTouches[0].clientX) ) ;
        this.mouseStartX = event.changedTouches[0].clientX;
				/* this.mouseY = ( event.changedTouches[0].clientY - this.windowHalfY ) * 5; */
  }


}