/**
 * @fileoverview Test component for AOS (Animate On Scroll) library functionality
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';

/**
 * Component for testing AOS animations and debugging functionality
 * @class TestAosComponent
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-test-aos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="height: 100vh; background: lightblue; display: flex; align-items: center; justify-content: center; flex-direction: column;">
      <h1>Scrolle nach unten für AOS Test</h1>
      <p>AOS Version: {{aosVersion}}</p>
      <button (click)="debugAOS()" style="padding: 10px; margin: 10px; font-size: 16px;">Debug AOS</button>
    </div>
    
    <div style="height: 50vh;"></div>
    
    <div data-aos="fade-up" data-aos-duration="1000" style="background: red; color: white; padding: 50px; margin: 20px; text-align: center;">
      <h2>TEST 1: Fade Up</h2>
      <p>Dieser Block sollte von unten einblenden</p>
    </div>
    
    <div data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200" style="background: green; color: white; padding: 50px; margin: 20px; text-align: center;">
      <h2>TEST 2: Fade Right</h2>
      <p>Dieser Block sollte von rechts einblenden</p>
    </div>
    
    <div data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400" style="background: blue; color: white; padding: 50px; margin: 20px; text-align: center;">
      <h2>TEST 3: Zoom In</h2>
      <p>Dieser Block sollte reinzoomen</p>
    </div>

    <div data-aos="fade-left" data-aos-duration="1000" style="background: purple; color: white; padding: 50px; margin: 20px; text-align: center;">
      <h2>TEST 4: Fade Left</h2>
      <p>Dieser Block sollte von links einblenden</p>
    </div>
    
    <div style="height: 100vh; background: lightgray; display: flex; align-items: center; justify-content: center;">
      <h1>Ende des Tests</h1>
    </div>
  `
})
export class TestAosComponent implements AfterViewInit {
  aosVersion = 'unknown';
  
  ngAfterViewInit() {
    console.log('TestAosComponent: Initialisiere AOS...');
    console.log('AOS object:', AOS);
    
    // Prüfe, ob AOS korrekt geladen wurde
    this.aosVersion = (AOS as any).version || 'unknown';
    
    // AOS komplett neu initialisieren
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 100,
      disable: false
    });
    
    console.log('AOS initialisiert');
    
    // Nach kurzer Verzögerung nochmal refreshen
    setTimeout(() => {
      AOS.refresh();
      console.log('AOS refreshed');
      this.debugAOS();
    }, 500);
  }

  debugAOS() {
    console.log('=== AOS DEBUG ===');
    console.log('AOS object:', AOS);
    console.log('AOS elements found:', document.querySelectorAll('[data-aos]'));
    console.log('Window scroll Y:', window.scrollY);
    console.log('Window inner height:', window.innerHeight);
    
    // Prüfe, ob AOS CSS geladen ist
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach((el, index) => {
      const computedStyle = window.getComputedStyle(el as Element);
      console.log(`Element ${index}:`, {
        element: el,
        opacity: computedStyle.opacity,
        transform: computedStyle.transform,
        transition: computedStyle.transition
      });
    });
  }
}
