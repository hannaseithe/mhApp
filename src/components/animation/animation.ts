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


  constructor(public navCtrl: NavController) { }


  ngAfterViewInit(): void {
    this.initialiseWebGLObjectAndEnvironment();
    this.renderAnimation();
  }


  initialiseWebGLObjectAndEnvironment(): void {
    this._ELEMENT = this.canvasEl.nativeElement;
    this._SCENE = new THREE.Scene();
    this._CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this._ELEMENT.appendChild(this.renderer.domElement);
    this._GEOMETRY = new THREE.SphereGeometry( 5, 32, 32 );
    this._MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    this._CUBE = new THREE.Mesh(this._GEOMETRY, this._MATERIAL);
    this._SCENE.add(this._CUBE);
    this._CAMERA.position.z = 5;
  }


  private _animate(): void {
    requestAnimationFrame(() => {
      this._animate();
    });

    this._CUBE.rotation.x += 0.002;
    this._CUBE.rotation.y += 0.005;

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


}