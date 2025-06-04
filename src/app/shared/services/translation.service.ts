import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Definiere unterstützte Sprachen
export type SupportedLanguage = 'en' | 'de';

// Interface für alle Übersetzungen
export interface TranslationSet {
  // Header
  about_me: string;
  skills: string;
  projects: string;
  contact: string;
  
  // ATF (Hero)
  hero_title: string;
  hero_subtitle: string;
  lets_talk: string;
  
  // About
  who_am_i: string;
  about_me_title: string;
  about_me_text1: string;
  about_me_text2: string;
  based_in: string;
  remote_work: string;
  learning: string;
  
  // Skills
  my_stack: string;
  skill_set: string;
  skill_description: string;
  
  // Portfolio
  my_craft: string;
  projects_title: string;
  projects_description: string;
  
  // Contact
  contact_me: string;
  ready_to_work: string;
  contact_text1: string;
  contact_text2: string;
  name: string;
  email: string;
  message: string;
  send: string;
  
  // Form Placeholders
  name_placeholder: string;
  email_placeholder: string;
  message_placeholder: string;
  
  // Privacy Policy
  agree_privacy_start: string;
  privacy_policy: string;
  agree_privacy_end: string;

  // Comments Section
  in_their_words: string;
  colleagues_thoughts: string;
  profile: string;
  
  // Kommentare (falls statisch)
  comment1_text: string;
  comment1_name: string;
  comment1_role: string;
  comment2_text: string;
  comment2_name: string;
  comment2_role: string;
  comment3_text: string;
  comment3_name: string;
  comment3_role: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<SupportedLanguage>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  // Alle Übersetzungen des Projekts
  private translations: { [key in SupportedLanguage]: TranslationSet } = {
    en: {
      // Header
      about_me: 'About me',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      
      // ATF (Hero)
      hero_title: "I'm Morteza",
      hero_subtitle: 'Frontend Developer',
      lets_talk: "Let's talk",
      
      // About
      who_am_i: "WHO'S MORTEZA",
      about_me_title: 'About Me',
      about_me_text1: "Hi, I'm Morteza. I'm passionate about coding because I love solving real-world problems and turning ideas into working solutions. I'm constantly inspired by how fast technology evolves, and I'm always pushing myself to learn and improve.",
      about_me_text2: "Let's collaborate and build something remarkable together!",
      based_in: 'Based in Hamburg',
      remote_work: 'Open to work Remote',
      learning: 'Open to learn new Things',
      
      // Skills
      my_stack: 'MY STACK',
      skill_set: 'Skill set',
      skill_description: 'My skills are a blend of design and development, allowing me to create visually appealing and functional web applications.',
      
      // Portfolio
      my_craft: 'MY CRAFT',
      projects_title: 'Projects',
      projects_description: "Here are a few highlights from my recent portfolio. Each project showcases a different challenge I tackled—whether it was building responsive UIs, integrating complex APIs, or optimizing performance for high-traffic applications.",
      
      // Contact
      contact_me: 'contact me',
      ready_to_work: 'Ready to work together?',
      contact_text1: "I love turning ideas into polished, user-friendly interfaces. If you need an extra pair of hands for React or TypeScript work, let's chat about how I can help move your project forward.",
      contact_text2: "I'm available for internships, freelance work, or entry-level roles and eager to learn from experienced teammates while delivering real value. Tell me what you're building—I'd be happy to contribute.",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',

      // Form Placeholders
      name_placeholder: 'Enter your name',
      email_placeholder: 'Enter your email address',
      message_placeholder: 'What would you like to discuss?',
      agree_privacy_start: "I've read the ",
      privacy_policy: "privacy policy",
      agree_privacy_end: " and agree to the processing of my data as outlined.",

      // Comments Section
      in_their_words: 'In their words',
      colleagues_thoughts: "Colleagues' thoughts",
      profile: 'Profile',
      
      // Kommentare (falls statisch)
      comment1_text: 'Morteza is an exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are top-notch.',
      comment1_name: 'John Doe',
      comment1_role: 'Project Manager at XYZ',
      comment2_text: 'Working with Morteza was a game-changer for our project. Their expertise in frontend development brought our vision to life.',
      comment2_name: 'Jane Smith',
      comment2_role: 'Creative Director at ABC',
      comment3_text: 'I highly recommend Morteza for any development project. They are skilled, reliable, and a great team player.',
      comment3_name: 'Emily Johnson',
      comment3_role: 'Lead Developer at 123'
    },
    de: {
      // Header
      about_me: 'Über mich',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      contact: 'Kontakt',
      
      // ATF (Hero)
      hero_title: "Ich bin Morteza Chinahkash",
      hero_subtitle: 'Frontend Entwickler',
      lets_talk: "Lass uns reden!",
      
      // About
      who_am_i: "WER IST MORTEZA",
      about_me_title: 'Über Mich',
      about_me_text1: "Hi, ich bin Morteza. Ich bin leidenschaftlich beim Programmieren, weil ich es liebe, reale Probleme zu lösen und Ideen in funktionsfähige Lösungen umzusetzen. Ich bin ständig davon inspiriert, wie schnell sich die Technologie entwickelt, und ich fordere mich immer wieder selbst heraus zu lernen und mich zu verbessern.",
      about_me_text2: "Lass uns zusammenarbeiten und etwas Bemerkenswertes gemeinsam aufbauen!",
      based_in: 'Wohnhaft in Hamburg',
      remote_work: 'Offen für Remote-Arbeit',
      learning: 'Offen für Neues',
      
      // Skills
      my_stack: 'MEINE TECHNOLOGIEN',
      skill_set: 'Fähigkeiten',
      skill_description: 'Meine Fähigkeiten sind eine Mischung aus Design und Entwicklung, die es mir ermöglicht, visuell ansprechende und funktionale Webanwendungen zu erstellen.',
      
      // Portfolio
      my_craft: 'MEINE ARBEIT',
      projects_title: 'Projekte',
      projects_description: "Hier sind einige Highlights aus meinem aktuellen Portfolio. Jedes Projekt zeigt eine andere Herausforderung, die ich bewältigt habe – sei es der Aufbau responsiver Benutzeroberflächen, die Integration komplexer APIs oder die Optimierung der Leistung für stark frequentierte Anwendungen.",
      
      // Contact
      contact_me: 'Kontaktiere mich',
      ready_to_work: 'Bereit zur Zusammenarbeit?',
      contact_text1: "Ich liebe es, Ideen in polierte, benutzerfreundliche Schnittstellen zu verwandeln. Wenn du eine zusätzliche Hilfe für React- oder TypeScript-Arbeit brauchst, lass uns darüber sprechen, wie ich dein Projekt voranbringen kann.",
      contact_text2: "Ich bin verfügbar für Praktika, Freiberufliche Arbeit oder Einstiegspositionen und freue mich darauf, von erfahrenen Teamkollegen zu lernen und gleichzeitig echten Mehrwert zu liefern. Erzähl mir, woran du arbeitest—ich würde mich freuen, dazu beizutragen.",
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Senden',

      // Form Placeholders
      name_placeholder: 'Gib deinen Namen ein',
      email_placeholder: 'Gib deine E-Mail-Adresse ein',
      message_placeholder: 'Worüber möchtest du sprechen?',
      agree_privacy_start: "Ich habe die ",
      privacy_policy: "Datenschutzerklärung",
      agree_privacy_end: " gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",

      // Comments Section
      in_their_words: 'In ihren Worten',
      colleagues_thoughts: "Gedanken der Kollegen",
      profile: 'Profil',
      
      // Kommentare (falls statisch)
      comment1_text: 'Morteza ist ein außergewöhnlicher Entwickler, der konsequent hochwertige Arbeit liefert. Sein Auge fürs Detail und seine Problemlösungsfähigkeiten sind erstklassig.',
      comment1_name: 'Max Mustermann',
      comment1_role: 'Projektleiter bei XYZ',
      comment2_text: 'Die Zusammenarbeit mit Morteza war ein Wendepunkt für unser Projekt. Seine Expertise in der Frontend-Entwicklung hat unsere Vision zum Leben erweckt.',
      comment2_name: 'Erika Musterfrau',
      comment2_role: 'Kreativdirektorin bei ABC',
      comment3_text: 'Ich empfehle Morteza für jedes Entwicklungsprojekt. Er ist kompetent, zuverlässig und ein großartiger Teamplayer.',
      comment3_name: 'Hans Müller',
      comment3_role: 'Leitender Entwickler bei 123'
    }
  };

  constructor() {
    // Beim Start gespeicherte Sprache laden
    this.initLanguage();
  }

  // Sprache ändern
  setLanguage(lang: SupportedLanguage): void {
    this.currentLangSubject.next(lang);
    // Speichern der Sprachpräferenz im localStorage
    localStorage.setItem('language', lang);
  }

  // Liefert Übersetzung für einen Schlüssel
  getTranslation(key: keyof TranslationSet): string {
    const currentLang = this.currentLangSubject.value;
    return this.translations[currentLang][key];
  }

  // Kurzform für Templates
  t(key: keyof TranslationSet): string {
    return this.getTranslation(key);
  }

  // Initialisierung der Sprache aus dem localStorage
  initLanguage(): void {
    const savedLang = localStorage.getItem('language') as SupportedLanguage;
    if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
      this.setLanguage(savedLang);
    }
  }
}