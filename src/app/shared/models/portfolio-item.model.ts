/**
 * @fileoverview Portfolio item model interface
 * @author Morteza Chinahkash
 * @version 1.0.0
 */

/**
 * Interface representing a portfolio project item
 * @interface PortfolioItem
 */
export interface PortfolioItem {
  /** The title of the portfolio project */
  title: string;
  
  /** Detailed description of the project */
  description: string;
  
  /** URL to the main project image */
  imageUrl: string;
  
  /** URL to the project's preview image in the projects section */
  projectsImageUrl: string;
  
  /** URL to the live project deployment */
  projectUrl: string;
  
  /** URL to the project's GitHub repository */
  gitHubUrl: string;
  
  /** Array of technologies used in the project */
  technologies: { name: string; imageUrl: string }[];
  
  /** Whether this project is featured prominently */
  isFeatured: boolean;
  
  /** Whether this project is currently in development */
  isInProgress: boolean;
  
  /** Component identifier for routing */
  compId: string;
  
  /** Unique identifier for the project */
  id: number;
}