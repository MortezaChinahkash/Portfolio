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
  
  // Portfolio Projekte
  // Allgemeine Portfolio-Texte
  my_projects: string;
  view_project: string;
  github_repo: string;
  in_progress: string;
  
  // Join Projekt
  join_title: string;
  join_description: string;
  
  // El Pollo Loco Projekt
  pollo_title: string;
  pollo_description: string;
  
  // DABubble Projekt
  dabubble_title: string;
  dabubble_description: string;
  
  // Comments Section
  in_their_words: string;
  colleagues_thoughts: string;
  profile: string;
  
  // Kommentar-Rollen
  role_frontend: string;
  role_backend: string;
  role_ux: string;
  
  // Kommentar-Texte
  comment1_text: string;
  comment2_text: string;
  comment3_text: string;
  
  // Contact Section
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

  // Projekt Details
  project_details: string;

  // Legal/Footer
  legal_notice: string;
  copyright: string;
  
  // Project Navigation
  go_back: string;
  next_project: string;
  github: string;
  live_test: string;
  
  // Project Content
  description: string;
  implementation_details: string;
  duration: string;
  tech_stack: string;
  loading_project: string;
  
  // Skills Section
  pull_to_peel: string;
  currently_learning: string;
  
  // Form Labels
  enter_your_name: string;
  enter_your_email: string;
  enter_your_message: string;
  
  // Social Media
  linkedin: string;
  github_social: string;
  mail: string;
  
  // Menu/Navigation
  menu_open: string;
  menu_close: string;
  
  // Imprint
  imprint_content: string;
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
      hero_title: "I'm Morteza Chinahkash",
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
      
      // Portfolio Projekte
      // Allgemeine Portfolio-Texte
      my_projects: "My Projects",
      view_project: "View Project",
      github_repo: "GitHub Repository",
      in_progress: "In Progress",
      
      // Join Projekt
      join_title: "Join",
      join_description: "A modern, Kanban-style task manager designed to bring remote teams together and keep projects flowing. Join lets users create workspaces, assign tasks with deadlines and subtasks, and reorganize everything via smooth drag-and-drop—no page refresh required.",
      
      // El Pollo Loco Projekt
      pollo_title: "El Pollo Loco – A Feather-Flinging 2-D Jump-'n'-Run",
      pollo_description: "Dive into a sun-scorched desert canyon where a fearless farmhand faces off against a riotous flock of mutant chickens. El Pollo Loco blends classic side-scrolling action with slap-stick humor and crisp, hand-drawn art to deliver a fast-paced platformer that feels both nostalgic and fresh.",
      
      // DABubble Projekt
      dabubble_title: "DABubble",
      dabubble_description: "A lightweight, privacy-first discussion hub built to replace scattered WhatsApp groups and long email chains in university courses and bootcamps. DABubble combines Slack-style channels with threaded conversations, emoji reactions, and file sharing.",
      
      // Comments Section
      in_their_words: "IN THEIR WORDS",
      colleagues_thoughts: "Colleagues' Thoughts",
      profile: "Profile",
      
      // Kommentar-Rollen
      role_frontend: "Frontend Developer",
      role_backend: "Backend Developer",
      role_ux: "UX Designer",
      
      // Kommentar-Texte
      comment1_text: "Morteza really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
      comment2_text: "It was a pleasure to work with Morteza. He knows how to motivate and encourage team members to deliver the best work possible, always adding value during each brainstorm.",
      comment3_text: "Morteza was an exceptional team colleague. His positive attitude and willingness to take on challenges made a significant contribution to us achieving our goals.",

      // Contact Section
      contact_me: 'Contact Me',
      ready_to_work: 'Ready to work together?',
      contact_text1: 'I would love to hear from you! Whether you have a question about my work, want to discuss a project, or just want to say hi, feel free to reach out.',
      contact_text2: 'You can contact me via the form below or connect with me on social media.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      
      // Form Placeholders
      name_placeholder: 'Enter your name',
      email_placeholder: 'Enter your email',
      message_placeholder: 'Enter your message',
      
      // Privacy Policy
      agree_privacy_start: 'I agree to the',
      privacy_policy: 'Privacy Policy',
      agree_privacy_end: 'and',

      // Projekt Details
      project_details: "Project details",

      // Legal/Footer
      legal_notice: "Legal Notice",
      copyright: "© Morteza Chinahkash 2025",
      
      // Project Navigation
      go_back: "Go Back",
      next_project: "Next Project",
      github: "GitHub",
      live_test: "Live Test",
      
      // Project Content
      description: "Description",
      implementation_details: "Implementation Details",
      duration: "Duration",
      tech_stack: "Tech Stack",
      loading_project: "Loading project information...",
      
      // Skills Section
      pull_to_peel: "Pull to peel",
      currently_learning: "currently learning these Skills:",
      
      // Form Labels
      enter_your_name: "Enter your name",
      enter_your_email: "Enter your email",
      enter_your_message: "Enter your message",
      
      // Social Media
      linkedin: "LinkedIn",
      github_social: "GitHub",
      mail: "Email",
      
      // Menu/Navigation
      menu_open: "Open menu",
      menu_close: "Close menu",
      
      // Imprint
      imprint_content: "Imprint works!",
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
      
      // Portfolio Projekte
      // Allgemeine Portfolio-Texte
      my_projects: "Meine Projekte",
      view_project: "Projekt ansehen",
      github_repo: "GitHub-Repository",
      in_progress: "In Bearbeitung",
      
      // Join Projekt
      join_title: "Join",
      join_description: "Ein moderner, Kanban-ähnlicher Aufgabenmanager, der für die Zusammenarbeit von Remote-Teams entwickelt wurde. Join ermöglicht Benutzern, Arbeitsbereiche zu erstellen, Aufgaben mit Fristen und Unteraufgaben zuzuweisen und alles per Drag-and-Drop neu zu organisieren – ohne Neuladen der Seite.",
      
      // El Pollo Loco Projekt
      pollo_title: "El Pollo Loco – Ein federsprühendes 2D-Jump-'n'-Run",
      pollo_description: "Tauche ein in eine sonnenverbrannte Wüstenschlucht, in der ein furchtloser Farmarbeiter gegen eine aufständische Herde mutierter Hühner antritt. El Pollo Loco verbindet klassische Side-Scrolling-Action mit Slapstick-Humor und klarer, handgezeichneter Kunst.",
      
      // DABubble Projekt
      dabubble_title: "DABubble",
      dabubble_description: "Eine leichtgewichtige, datenschutzfreundliche Diskussionsplattform, die verstreute WhatsApp-Gruppen und lange E-Mail-Ketten in Universitätskursen und Bootcamps ersetzen soll. DABubble kombiniert Slack-ähnliche Kanäle mit strukturierten Unterhaltungen, Emoji-Reaktionen und Dateifreigaben.",
      
      // Comments Section
      in_their_words: "IN IHREN WORTEN",
      colleagues_thoughts: "Meinungen von Kollegen",
      profile: "Profil",
      
      // Kommentar-Rollen
      role_frontend: "Frontend Entwickler",
      role_backend: "Backend Entwickler",
      role_ux: "UX Designer",
      
      // Kommentar-Texte
      comment1_text: "Morteza hat das Team mit seiner großartigen Organisation und klaren Kommunikation wirklich zusammengehalten. Ohne sein Engagement wären wir nicht so weit gekommen.",
      comment2_text: "Es war eine Freude, mit Morteza zu arbeiten. Er weiß, wie man Teammitglieder motiviert und ermutigt, die bestmögliche Arbeit zu leisten, und bringt bei jedem Brainstorming einen Mehrwert.",
      comment3_text: "Morteza war ein außergewöhnlicher Teamkollege. Seine positive Einstellung und seine Bereitschaft, Herausforderungen anzunehmen, haben maßgeblich dazu beigetragen, dass wir unsere Ziele erreicht haben.",

      // Contact Section
      contact_me: 'Kontaktiere mich',
      ready_to_work: 'Lass uns zusammen arbeiten!',
      contact_text1: 'Ich würde mich freuen, von dir zu hören! Egal, ob du eine Frage zu meiner Arbeit hast, ein Projekt besprechen möchtest oder einfach nur Hallo sagen möchtest, zögere nicht, mich zu kontaktieren.',
      contact_text2: 'Du kannst mich über das folgende Formular kontaktieren oder dich mit mir in den sozialen Medien verbinden.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Senden',
      
      // Form Placeholders
      name_placeholder: 'Gib deinen Namen ein',
      email_placeholder: 'Gib deine E-Mail ein',
      message_placeholder: 'Gib deine Nachricht ein',
      
      // Privacy Policy
      agree_privacy_start: 'Ich stimme der',
      privacy_policy: 'Datenschutzbestimmungen',
      agree_privacy_end: 'und den',

      // Projekt Details
      project_details: "Projektdetails",

      // Legal/Footer
      legal_notice: "Impressum",
      copyright: "© Morteza Chinahkash 2025",
      
      // Project Navigation
      go_back: "Zurück",
      next_project: "Nächstes Projekt",
      github: "GitHub",
      live_test: "Live Test",
      
      // Project Content
      description: "Beschreibung",
      implementation_details: "Implementierungsdetails",
      duration: "Dauer",
      tech_stack: "Tech Stack",
      loading_project: "Projektinformationen werden geladen...",
      
      // Skills Section
      pull_to_peel: "Ziehen zum Abziehen",
      currently_learning: "lerne derzeit diese Fähigkeiten:",
      
      // Form Labels
      enter_your_name: "Gib deinen Namen ein",
      enter_your_email: "Gib deine E-Mail ein",
      enter_your_message: "Gib deine Nachricht ein",
      
      // Social Media
      linkedin: "LinkedIn",
      github_social: "GitHub",
      mail: "E-Mail",
      
      // Menu/Navigation
      menu_open: "Menü öffnen",
      menu_close: "Menü schließen",
      
      // Imprint
      imprint_content: "Impressum funktioniert!",
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