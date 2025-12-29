import brandIdentityImage from 'figma:asset/d10e1948b697388ffa4b9a35e88a527604592072.png';
import brandIdentityModalImage from 'figma:asset/a5ce11b07600e8b7ebb0b2e098a13244952ae38e.png';
import silentHImage from 'figma:asset/89ceb0a3da411f6c2b4a70113340d7d65958bf22.png';
import metaCitiImage from 'figma:asset/65f2859b1bf83092e9d490aca9b35554638fd809.png';
import metaCitiDashboardImage from 'figma:asset/930c33eddc7a46b337f72c714b3be1d03f400a3b.png';
import php360Image from 'figma:asset/e5709a7a0ffc9e50fb5f94cc254b312e8c2d2cc1.png';
import pythonBCIGameImage from 'figma:asset/e97a68ff5dd1598510938cea4d5540d6f3adb744.png';

export interface Project {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  year: string;
  modalImage?: string; // Optional separate image for modal view
}

export const projects: Project[] = [
  { 
    id: 1, 
    image: silentHImage, 
    title: 'Silent H Bar & Restaurant', 
    category: 'Development', 
    description: 'Figma -> Live modular react website, freelance contract',
    year: '2024'
  },
  { 
    id: 2, 
    image: metaCitiImage, 
    title: 'MetaCiti website', 
    category: 'Development', 
    description: 'Redesigned and built modular React website for Currus AI metaciti division',
    year: '2023'
  },
  { 
    id: 3, 
    image: metaCitiDashboardImage, 
    title: 'MetaCiti App Dashboard/UI', 
    category: 'Development', 
    description: 'Worked on React Typescript Project, adding UI fixes, and connecting frontend additions to new backend functions',
    year: '2024'
  },
  { 
    id: 4, 
    image: pythonBCIGameImage, 
    title: 'Python-based BCI game', 
    category: 'Development', 
    description: 'Second contract with Zeuron, this time leading development of a Python BCI game. Delivered game except for one level, which was essentially a second game within the game that required completely different mechanics',
    year: '2024'
  },
  { 
    id: 5, 
    image: php360Image, 
    title: 'PHP 360 Review Tool', 
    category: 'Development', 
    description: 'Project for client at Dalhousie University. Website revived and brought to working, deployed & delivered state',
    year: '2024'
  },
  { 
    id: 6, 
    image: brandIdentityImage, 
    modalImage: brandIdentityModalImage,
    title: 'Brain Computer Interface Game', 
    category: 'Development', 
    description: '3D Platformer built for BCI interface',
    year: '2024'
  },
];