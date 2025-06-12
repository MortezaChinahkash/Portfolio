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
  click_to_peel: string;
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
  
  // Imprint - ALLE Imprint-Eigenschaften hinzufügen
  imprint_content: string;
  imprint_title: string;
  imprint_details_title: string;
  imprint_represented_by: string;
  imprint_contact: string;
  imprint_phone: string;
  imprint_email: string;
  imprint_disclaimer: string;
  imprint_content_liability: string;
  imprint_content_liability_text: string;
  imprint_links_liability: string;
  imprint_links_liability_text: string;
  imprint_copyright: string;
  imprint_copyright_text: string;
  imprint_privacy: string;
  imprint_privacy_text: string;

  // Project specific content
  project_implementation_text: string;
  project_duration_weeks: string;
  tech_stack_label: string;

  // Project specific details
  project_duration_value: string;
  project_role_workflow: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = 'en'; // Synchrone Property hinzufügen
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
      remote_work: 'Open to work remote',
      learning: 'Open to learn new things',
      
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
      pollo_title: "El Pollo Loco",
      pollo_description: "Dive into a sun-scorched desert canyon where a fearless farmhand faces off against a riotous flock of mutant chickens. El Pollo Loco blends classic side-scrolling action with slap-stick humor and crisp, hand-drawn art to deliver a fast-paced platformer that feels both nostalgic and fresh.",
      
      // DABubble Projekt  
      dabubble_title: "DABubble",
      dabubble_description: "A lightweight, privacy-friendly discussion platform designed to replace scattered WhatsApp groups and long email chains in university courses and bootcamps. DABubble combines Slack-like channels with structured conversations, emoji reactions, and file sharing.",
      
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
      agree_privacy_end: 'and agree to the processing of my personal data as outlined',

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
      click_to_peel: "Click to peel",
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
      
      // Imprint - ALLE Imprint-Eigenschaften hinzufügen
      imprint_content: "Imprint works!",
      imprint_title: "Legal Notice",
      imprint_details_title: "Information according to § 5 TMG",
      imprint_represented_by: "Represented by",
      imprint_contact: "Contact",
      imprint_phone: "Phone",
      imprint_email: "Email",
      imprint_disclaimer: "Disclaimer",
      imprint_content_liability: "Liability for Content",
      imprint_content_liability_text: "The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content. As service providers, we are liable for our own content on these pages in accordance with § 7, para.1 of the TMG under general laws. However, pursuant to §§ 8 to 10 of the TMG, we as service providers are under no obligation to monitor submitted or stored information or to search for circumstances that indicate illegal activity.",
      imprint_links_liability: "Liability for Links",
      imprint_links_liability_text: "Our offer includes links to external third-party websites, whose content we have no influence on. Therefore, we cannot assume any liability for these external contents either. The respective provider or operator of the linked pages is always responsible for the content of the linked pages.",
      imprint_copyright: "Copyright",
      imprint_copyright_text: "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.",
      imprint_privacy: "Privacy Policy",
imprint_privacy_text: "The use of our website is generally possible without providing personal data. Insofar as personal data (such as name, address or email addresses) is collected on our pages, this is always done on a voluntary basis wherever possible. This data will not be passed on to third parties without your explicit consent.\n\nWe would like to point out that data transmission over the Internet (e.g. when communicating by email) can have security vulnerabilities. A complete protection of data against access by third parties is not possible.\n\nThe use of contact data published within the framework of the legal notice obligation by third parties for sending unsolicited advertising and information materials is hereby expressly prohibited. The operators of the site expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, such as spam emails.",

      // Project specific content
      project_implementation_text: "This project was built using modern web technologies with a focus on clean code and user experience.",
      project_duration_weeks: "weeks",
      tech_stack_label: "Technology Stack",
      project_duration_value: "6 weeks",
      project_role_workflow: "Frontend Development & UI/UX Design"
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
      learning: 'Offen um neues zu lernen',
      
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
      pollo_title: "El Pollo Loco",
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
      agree_privacy_end: 'zu und stimme der Verarbeitung meiner personenbezogenen Daten wie beschrieben zu',

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
      click_to_peel: "Klicken zum Abziehen",
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
      
      // Imprint - ALLE Imprint-Eigenschaften hinzufügen
      imprint_content: "Impressum funktioniert!",
      imprint_title: "Impressum",
      imprint_details_title: "Angaben gemäß § 5 TMG",
      imprint_represented_by: "Vertreten durch",
      imprint_contact: "Kontakt",
      imprint_phone: "Telefon",
      imprint_email: "E-Mail",
      imprint_disclaimer: "Haftungsausschluss",
      imprint_content_liability: "Haftung für Inhalte",
      imprint_content_liability_text: "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      imprint_links_liability: "Haftung für Links",
      imprint_links_liability_text: "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      imprint_copyright: "Urheberrecht",
      imprint_copyright_text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
      imprint_privacy: "Datenschutz",
imprint_privacy_text: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.\n\nWir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.\n\nDer Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.",

      // Project specific content
      project_implementation_text: "Dieses Projekt wurde mit modernen Webtechnologien entwickelt, mit Fokus auf sauberen Code und Benutzererfahrung.",
      project_duration_weeks: "Wochen",
      tech_stack_label: "Technologie-Stack",
      project_duration_value: "6 Wochen",
      project_role_workflow: "Frontend-Entwicklung & UI/UX-Design"
    }
  };

  constructor() {
    // Beim Start gespeicherte Sprache laden
    this.initLanguage();
  }

  // Sprache ändern
  setLanguage(lang: SupportedLanguage): void {
    this.currentLanguage = lang; // Synchrone Property aktualisieren
    this.currentLangSubject.next(lang);
    // Speichern der Sprachpräferenz im localStorage
    localStorage.setItem('language', lang);
  }

  get currentLang(): string {
    return this.currentLanguage;
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